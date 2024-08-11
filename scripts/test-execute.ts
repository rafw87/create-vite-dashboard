import * as assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn, ChildProcess } from 'node:child_process';
import { Writable, Readable } from 'node:stream';
import { parseArgs } from 'node:util';

const {
  positionals: [targetDir = '../test-vite-dashboard'],
  values,
} = parseArgs({
  args: process.argv.slice(2),
  options: {
    projectName: { type: 'string', default: 'test-project' },
    version: { type: 'string', default: '1.2.3' },
    description: { type: 'string', default: 'my description' },
    repositoryUrl: { type: 'string', default: 'http://www.example.com' },
    keyword: { type: 'string', multiple: true, default: ['keyword1', 'keyword2', 'keyword3'] },
    author: { type: 'string', default: 'John Doe' },
    license: { type: 'string', default: 'Beerware' },
    isPrivate: { type: 'boolean', default: true },
  },
  allowPositionals: true,
});

console.log(targetDir, values);

function makePromiseWithTimeout<T>(timeout: number = 10000) {
  let resolve: (result: T) => void = () => {};
  let reject: (reason: unknown) => void = () => {};

  const promise = new Promise<T>((_resolve, _reject) => {
    const timeoutHandle = setTimeout(handleTimeout, timeout);
    resolve = handleResolve;
    reject = handleReject;
    let isFulfilled = false;
    function handleResolve(result: T) {
      if (isFulfilled) {
        return;
      }
      isFulfilled = true;
      clearTimeout(timeoutHandle);
      _resolve(result);
    }
    function handleReject(reason: unknown) {
      if (isFulfilled) {
        return;
      }
      isFulfilled = true;
      clearTimeout(timeoutHandle);
      _reject(reason);
    }
    function handleTimeout() {
      if (isFulfilled) {
        return;
      }
      isFulfilled = true;
      clearTimeout(timeoutHandle);
      _reject(new Error('Timeout when waiting for condition on stream.'));
    }
  });
  return {
    promise,
    resolve,
    reject,
  };
}

function waitForStream(stream: Readable, condition: (bufferedText: string) => boolean, timeout: number = 10000) {
  const { resolve, promise } = makePromiseWithTimeout<string>(timeout);
  let buffer = '';
  const writable = new Writable({
    write(chunk: Buffer, encoding, callback) {
      const newStr = chunk.toString('utf8');
      buffer += newStr;
      callback(null);
      if (condition(buffer)) {
        resolve(buffer);
      }
    },
  });
  stream.pipe(writable);

  return promise.finally(() => stream.unpipe(writable));
}

function waitForProcessClose(childProcess: ChildProcess, timeout: number) {
  const { promise, resolve, reject } = makePromiseWithTimeout<void>(timeout);

  childProcess.on('exit', (code: number) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Process exited with non-zero code: ${code}`));
    }
  });

  return promise;
}

(async function () {
  const childProcess = spawn('npm create @rafw87/vite-dashboard', {
    shell: true,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  childProcess.stdout.pipe(process.stdout);

  await waitForStream(childProcess.stdout, (str) => /Target dir:/.test(str));
  childProcess.stdin.write(targetDir + '\n');
  await waitForStream(childProcess.stdout, (str) => /Project name:/.test(str));
  childProcess.stdin.write(values.projectName + '\n');
  await waitForStream(childProcess.stdout, (str) => /Version:/.test(str));
  childProcess.stdin.write(values.version + '\n');
  await waitForStream(childProcess.stdout, (str) => /Description:/.test(str));
  childProcess.stdin.write(values.description + '\n');
  await waitForStream(childProcess.stdout, (str) => /Repository:/.test(str));
  childProcess.stdin.write(values.repositoryUrl + '\n');
  await waitForStream(childProcess.stdout, (str) => /Keywords:/.test(str));
  childProcess.stdin.write(values.keyword.join(',') + '\n');
  await waitForStream(childProcess.stdout, (str) => /Author:/.test(str));
  childProcess.stdin.write(values.author + '\n');
  await waitForStream(childProcess.stdout, (str) => /License:/.test(str));
  childProcess.stdin.write(values.license + '\n');
  await waitForStream(childProcess.stdout, (str) => /Private:/.test(str));
  childProcess.stdin.write(values.isPrivate ? 'y\n' : 'n\n');

  await waitForProcessClose(childProcess, 120000);

  console.log('');
  console.log('Checking package.json after creation...');
  const packageJsonString = await readFile(resolve(targetDir, 'package.json'), 'utf8');
  const packageJson = JSON.parse(packageJsonString);
  assert.strictEqual(packageJson.name, values.projectName);
  assert.strictEqual(packageJson.version, values.version);
  assert.strictEqual(packageJson.description, values.description);
  assert.strictEqual(packageJson.repository?.url, values.repositoryUrl);
  assert.deepStrictEqual(packageJson.keywords, values.keyword);
  assert.strictEqual(packageJson.author, values.author);
  assert.strictEqual(packageJson.license, values.license);
  assert.strictEqual(packageJson.private, values.isPrivate);
  console.log('Created package.json is correct.');
})().catch(console.error);
