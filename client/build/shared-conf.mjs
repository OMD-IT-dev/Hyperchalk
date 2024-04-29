import fs from "node:fs"
import path from "node:path"

export function copyFolderSync(source, target) {
  if (fs.lstatSync(source).isDirectory()) {
    fs.mkdirSync(target, { recursive: true })
    let files = fs.readdirSync(source)
    for (let file of files) {
      let curSource = path.join(source, file)
      let curTarget = path.join(target, file)
      copyFolderSync(curSource, curTarget)
    }
  } else {
    fs.copyFileSync(source, target)
  }
}

const copyStaticPlugin = {
  name: "copy-static",
  setup(build) {
    build.onEnd(() => {
      copyFolderSync("static", "dist")
      copyFolderSync("node_modules/@excalidraw/excalidraw/dist/excalidraw-assets", "dist/excalidraw-assets")
      copyFolderSync("node_modules/@excalidraw/excalidraw/dist/excalidraw-assets-dev", "dist/excalidraw-assets-dev")
    })
  },
}

export default {
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outfile: "dist/app.js",
  sourcemap: true,
  plugins: [copyStaticPlugin],
  define: {
    "process.env": "{}",
  },
  logLevel: "info",
}
