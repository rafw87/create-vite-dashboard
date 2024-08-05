import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { ExitPromptError } from '@inquirer/core';
import { input, confirm } from '@inquirer/prompts';


const { positionals: [argTargetDir] } = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true
});

const readPackageJson = async (targetDir: string) => {
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  return JSON.parse(packageJsonData);
}

const updatePackageJson = async (targetDir: string, data: Record<string, unknown>) => {
  const packageJsonPath = path.join(targetDir, 'package.json');
  try {
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonData);
    const updatedPackageJson = { ...packageJson, ...data };
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(updatedPackageJson, null, 2),
      'utf8'
    );
  } catch (err) {
    console.log(err.message);
  }
};

(async function () {

  const targetDir = argTargetDir ?? await input({ message: 'Target dir:', required: true });

  const fullTargetDir = path.join(process.cwd(), targetDir);
  const sourceDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../template',
  );

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
  const isPrivate = await confirm({ message: 'Private:', default: packageJson.private  });

  const keywords = keywordsString ? keywordsString.split(',').map(keyword => keyword.trim()) : undefined;

  const repository = repositoryUrl ? {
    type: 'git',
    url: repositoryUrl,
  } : undefined;

  // Copying logic
  console.log('Target directory doesn\'t exist');
  console.log('Creating directory...');
  await fs.mkdir(targetDir, { recursive: true });
  console.log('Finished creating directory');
  await fs.cp(sourceDir, fullTargetDir, { recursive: true, filter: source => !/node_modules/.test(source) });
  await updatePackageJson(fullTargetDir, {
    name: projectName,
    version,
    description,
    repository,
    license,
    author,
    keywords,
    private: isPrivate
  })
  console.log(`Finished generating your project ${projectName}`);
  console.log(`cd ${projectName}`);
  console.log(`npm install`);



})().catch(err => {
  if(err instanceof ExitPromptError) {
    process.exit(130);
  } else {
    console.error(err.message);
    process.exit(1);
  }
})
