#!/usr/bin/env node

// const preactCompatPlugin = require("./build/esbuild-preact-compat")
import * as esbuild from "esbuild"
import sharedConf from "./build/shared-conf.mjs"
import process from "node:process"

let ctx = await esbuild.context(sharedConf)

// let server = await ctx.serve({
//   servedir: "dist",
//   host: "localhost",
//   port: 8080,
// })
// console.log(`Serving on http://${server.host}:${server.port}`)

await ctx.watch()
console.log("watching...")

process.on("SIGINT", () => void console.log("\nexiting."))
