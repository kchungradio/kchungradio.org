{
  description = "KCHUNG Radio Website";

  inputs = {
    nixpkgs.url = github:nixos/nixpkgs/nixos-23.11;
    flake-utils.url = github:numtide/flake-utils;
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    flake-utils.lib.eachDefaultSystem
      (system:
        let pkgs = import nixpkgs { inherit system; };
        in rec {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodePackages.prettier
              pkgs.nodePackages.vercel
              pkgs.nodejs
              pkgs.yarn
            ];
          };

          formatter = pkgs.nixpkgs-fmt;

          packages = let
            kchungradio = pkgs.buildNpmPackage rec {
              pname = "kchungradio.org";
              version = "0.1.0.0";
              buildInputs = [
                pkgs.nodejs
              ];
              src = ./.;
              npmDepsHash = "sha256-ej6qnzSAkEOBNOYwPRaJWmst7BQRe3BDdbi76y708Aw=";
              npmBuild = "npm run build";

              installPhase = ''
                mkdir $out
                mkdir $out/.next

                cp -r .next/standalone $out
                cp -r .next/static $out/.next/static
                '';
            };
            in {
            default = kchungradio;
            container = pkgs.dockerTools.buildLayeredImage
              {
                name = "kchungradio.org";
                contents = [ pkgs.nodejs kchungradio ];
                config = {
                  Cmd = [
                    "${pkgs.nodejs}/bin/node"
                    "server.js"
                  ];
                  ExposedPorts = {
                    "3000/tcp" = { };
                  };
                };
              };
          };
        });
}
