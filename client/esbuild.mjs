#!/usr/bin/env node

// const preactCompatPlugin = require("./build/esbuild-preact-compat")
import * as esbuild from "esbuild"
import sharedConf from "./build/shared-conf.mjs"
import fs from "fs"

try {
  let result = esbuild.build({
    ...sharedConf,
    minify: true,
    metafile: true,
    treeShaking: true,
    define: {
      "process.env": "{NODE_ENV: 'production'}",
      production: "'production'",
    },
  })

  fs.writeFileSync("dist/meta.json", JSON.stringify(result.metafile))
} catch (e) {
  process.exit(1)
}
