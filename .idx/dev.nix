
{ pkgs }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    #pkgs.nodePackages.vite  # Add vite as a package
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  idx.previews = {
    previews = {
      web = {
        command = [
          "npx"              # Use npx to run vite
          "vite"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
