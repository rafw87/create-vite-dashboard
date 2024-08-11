import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { globby } from 'globby';
import { ExitPromptError } from '@inquirer/core';
import { input, confirm } from '@inquirer/prompts';

const {
  positionals: [argTargetDir],
} = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
});

async function readPackageJson(targetDir: string) {
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  return JSON.parse(packageJsonData);
}

async function getFiles(sourceDir: string) {
  return await globby(['**', '**/.*', '**/.*/**'], {
    cwd: sourceDir,
    gitignore: true,
  });
}

async function initGit(targetDir: string) {
  console.log(`Creating git repository...`);
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
}

async function copyFiles(sourceDir: string, targetDir: string, files: string[]) {
  console.log(`Copying files...`);
  for (const file of files) {
    console.log(`  Copying ${file}...`);
    const targetFile = file.replace(/.gitignore.keep/gi, '.gitignore');
    await fs.cp(path.join(sourceDir, file), path.join(targetDir, targetFile));
  }
}

async function updatePackageJson(targetDir: string, data: Record<string, unknown>) {
  const packageJsonPath = path.join(targetDir, 'package.json');
  console.log(`Updating package.json...`);
  try {
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonData);
    const updatedPackageJson = { ...packageJson, ...data };
    await fs.writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2), 'utf8');
  } catch (err) {
    console.log(err.message);
  }
}

async function runInstall(targetDir: string) {
  console.log(`Installing dependencies...`);
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
}

async function runPrettier(targetDir: string) {
  console.log(`Running Prettier...`);
  execSync('npm run prettier:fix -- --log-level warn', { cwd: targetDir, stdio: 'inherit' });
}

async function commitFiles(targetDir: string) {
  console.log(`Commiting files to GIT...`);
  execSync('git add .', { cwd: targetDir, stdio: 'inherit' });
  execSync('git commit -m "Initial commit" --no-verify', { cwd: targetDir, stdio: 'inherit' });
}

(async function () {
  const targetDir = argTargetDir ?? (await input({ message: 'Target dir:', required: true }));

  const fullTargetDir = path.resolve(process.cwd(), targetDir);
  const sourceDir = path.resolve(fileURLToPath(import.meta.url), '../../template');

  const templateFiles = await getFiles(sourceDir);

  if (existsSync(fullTargetDir)) {
    throw new Error('Target directory already exist!');
  }

  const packageJson = await readPackageJson(sourceDir);

  const defaultProjectName = path.basename(targetDir);
  const projectName = await input({ message: 'Project name:', required: true, default: defaultProjectName });

  const version = await input({ message: 'Version:', required: true, default: packageJson.version });
  const description = await input({ message: 'Description:', required: false, default: packageJson.description });
  const repositoryUrl = await input({ message: 'Repository:', required: false });
  const keywordsString = await input({ message: 'Keywords:', required: false });
  const author = await input({ message: 'Author:', required: false, default: packageJson.author });
  const license = await input({ message: 'License:', default: packageJson.license });
  const isPrivate = await confirm({ message: 'Private:', default: packageJson.private });

  const keywords = keywordsString ? keywordsString.split(',').map((keyword) => keyword.trim()) : undefined;

  const repository = repositoryUrl
    ? {
        type: 'git',
        url: repositoryUrl,
      }
    : undefined;

  // Copying logic
  console.log("Target directory doesn't exist, creating directory...");
  await fs.mkdir(fullTargetDir, { recursive: true });
  console.log('Finished creating directory');

  await initGit(fullTargetDir);
  await copyFiles(sourceDir, fullTargetDir, templateFiles);
  await updatePackageJson(fullTargetDir, {
    name: projectName,
    version,
    description,
    repository,
    license,
    author,
    keywords,
    private: isPrivate,
  });
  await runInstall(fullTargetDir);
  // await runPrettier(fullTargetDir);
  await commitFiles(fullTargetDir);
  console.log(`\nFinished generating your project ${projectName}. Now you can run it:`);
  console.log(`$ cd ${targetDir}`);
  console.log(`$ npm run dev`);
})().catch((err) => {
  if (err instanceof ExitPromptError) {
    process.exit(130);
  } else {
    console.error(err.message);
    process.exit(1);
  }
});
