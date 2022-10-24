{
  description = "KCHUNG Radio Website";

  inputs = {
    nixpkgs.url = github:nixos/nixpkgs/nixos-22.05;
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      nodePackages = import ./default.nix {
        inherit pkgs system;
        nodejs = pkgs."nodejs-16_x";
      };
    in {
      defaultPackage.x86_64-linux = nodePackages."kchungradio.org";

      overlay = final: prev: {
        graphqurl = nodePackages."kchungradio.org" ;
      };

      devShell.x86_64-linux = pkgs.mkShell {
        buildInputs = [
          pkgs.nodePackages.prettier
          pkgs.nodePackages.vercel
          pkgs.nodejs
        ];
      };
    };
}
