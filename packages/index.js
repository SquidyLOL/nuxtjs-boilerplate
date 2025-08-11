#!/usr/bin/env node
import { execSync } from "node:child_process"
import os from "node:os"
import path from "node:path"
import fs from "fs-extra"
import inquirer from "inquirer"

// ===== Constants =====
const REPO_URL = "https://github.com/matimortari/nuxtjs-boilerplate.git"
const PRESET_EXTRA_SCRIPTS = {
  "with-tests": {
    "test": "vitest",
    "test:e2e": "playwright test",
    "coverage": "vitest --coverage",
  },
}
const PRESET_EXTRA_PACKAGES = {
  "with-i18n": {
    dependencies: {
      "@nuxtjs/i18n": "9.1.1",
    },
  },
  "with-tests": {
    devDependencies: {
      "@nuxt/test-utils": "3.19.2",
      "@vitest/coverage-v8": "3.2.4",
      "@vue/test-utils": "2.4.6",
      "happy-dom": "18.0.1",
      "@playwright/test": "1.54.2",
      "vitest": "3.2.4",
    },
  },
}

// ===== Helper Functions =====
function getProjectNameFromArgs() {
  const args = process.argv.slice(2)
  const nIndex = args.findIndex(a => a === "-n" || a === "--name")
  if (nIndex !== -1 && args.length > nIndex + 1) {
    return args[nIndex + 1]
  }
  return null
}

function mergeObjects(base = {}, extra = {}) {
  return { ...base, ...extra }
}

// ===== Main CLI Logic =====
async function run() {
  try {
    console.log("Welcome to Nuxt.js Boilerplate CLI!\n")

    // Step 1: Get project folder name
    let projectName = getProjectNameFromArgs()
    if (!projectName) {
      const { projectName: answerName } = await inquirer.prompt({
        type: "input",
        name: "projectName",
        message: "Enter your new project folder name:",
        default: "my-nuxt-app",
        validate: input => (input ? true : "Project folder name cannot be empty"),
      })
      projectName = answerName
    }

    const targetDir = path.resolve(process.cwd(), projectName)
    if (fs.existsSync(targetDir)) {
      console.error(
        `Error: Folder "${projectName}" already exists. Please choose another name or remove it.`,
      )
      process.exit(1)
    }

    // Step 2: Clone repo
    const tmpDir = path.join(os.tmpdir(), `nuxt-boilerplate-${Date.now()}`)
    console.log("\nCloning boilerplate repo...")
    execSync(`git clone --depth=1 ${REPO_URL} "${tmpDir}"`, { stdio: "inherit" })

    // Step 3: Copy root-template
    const rootTemplateDir = path.join(tmpDir, "packages", "config", "root-template")
    if (!(await fs.pathExists(rootTemplateDir))) {
      console.error(`Error: Root template directory "${rootTemplateDir}" not found in the repo.`)
      process.exit(1)
    }
    await fs.copy(rootTemplateDir, targetDir)

    // Step 4: Init git repo?
    const { initGit } = await inquirer.prompt({
      type: "confirm",
      name: "initGit",
      message: "Initialize a git repository?",
      default: true,
    })
    if (initGit) {
      console.log("Initializing git repository...")
      execSync("git init", { cwd: targetDir, stdio: "inherit" })
    }

    // Step 5: Select preset
    const { preset } = await inquirer.prompt({
      type: "list",
      name: "preset",
      message: "Select a preset:",
      choices: [
        { name: "Standard", value: "standard" },
        { name: "With i18n", value: "with-i18n" },
        { name: "With Tests", value: "with-tests" },
      ],
    })

    // Step 6: Copy preset files
    const presetFolderName = `[${preset}]`
    const presetDir = path.join(tmpDir, "packages", "config", presetFolderName)
    if (!(await fs.pathExists(presetDir))) {
      console.error(`Error: Preset directory "${presetDir}" not found in the repo.`)
      process.exit(1)
    }
    const presetRootFiles = await fs.readdir(presetDir)
    for (const file of presetRootFiles) {
      if (file === "app")
        continue
      const src = path.join(presetDir, file)
      const dest = path.join(targetDir, file)
      await fs.copy(src, dest, { overwrite: true })
    }

    // Merge app folder
    const presetAppDir = path.join(presetDir, "app")
    if (await fs.pathExists(presetAppDir)) {
      const targetAppDir = path.join(targetDir, "app")
      await fs.copy(presetAppDir, targetAppDir, { overwrite: true, recursive: true })
    }

    // Step 6.1: Merge package.json
    const rootPkgPath = path.join(rootTemplateDir, "package.json")
    const targetPkgPath = path.join(targetDir, "package.json")
    const rootPkg = JSON.parse(await fs.readFile(rootPkgPath, "utf8"))

    const extraPkgs = PRESET_EXTRA_PACKAGES[preset] || { dependencies: {}, devDependencies: {} }
    const extraScripts = PRESET_EXTRA_SCRIPTS[preset] || {}

    const mergedPkg = {
      ...rootPkg,
      dependencies: mergeObjects(rootPkg.dependencies, extraPkgs.dependencies),
      devDependencies: mergeObjects(rootPkg.devDependencies, extraPkgs.devDependencies),
      scripts: mergeObjects(rootPkg.scripts, extraScripts),
    }
    await fs.writeFile(targetPkgPath, JSON.stringify(mergedPkg, null, 2), "utf8")

    // Step 7: Install dependencies?
    const { installDeps } = await inquirer.prompt({
      type: "confirm",
      name: "installDeps",
      message: "Do you want to install npm dependencies now?",
      default: true,
    })
    if (installDeps) {
      console.log("Installing npm dependencies...")
      execSync("npm install", { cwd: targetDir, stdio: "inherit" })

      console.log("Running lint fix...")
      execSync("npm run lint:fix", { cwd: targetDir, stdio: "inherit" })
    }

    // Step 8: Cleanup temp dir
    await fs.remove(tmpDir)

    console.log(`\nProject setup complete! Happy coding! 🎉`)
  }
  catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

run()
