const path = require("path");
const { spawn } = require("child_process");
const Bundler = require("parcel-bundler");

const entryFile = path.join(__dirname, "n4m-facemesh_camera.html");
const PORT = process.env.PORT || 3000;
const HOST = "localhost";

function openBrowser(url) {
  const platform = process.platform;
  let command;
  let args;

  if (platform === "win32") {
    command = "cmd";
    args = ["/c", "start", "", url];
  } else if (platform === "darwin") {
    command = "open";
    args = [url];
  } else {
    command = "xdg-open";
    args = [url];
  }

  try {
    const child = spawn(command, args, { stdio: "ignore", detached: true });
    child.unref();
  } catch (error) {
    console.warn("Could not auto-open browser:", error.message);
  }
}

async function start() {
  const bundler = new Bundler(entryFile, {
    hmr: false,
    cache: false,
    publicUrl: "./",
    sourceMaps: true,
  });

  await bundler.serve(PORT, false, HOST);

  const url = `http://${HOST}:${PORT}`;
  console.log(`Facemesh page available at ${url}`);
  openBrowser(url);
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
