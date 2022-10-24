{
  description = "KCHUNG Radio Website";

  inputs = {
    nixpkgs.url = github:nixos/nixpkgs/nixos-22.05;
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShell.x86_64-linux = pkgs.mkShell {
        buildInputs = [
          pkgs.nodePackages.prettier
          pkgs.nodePackages.vercel
          pkgs.nodejs
        ];
      };
    };
}
