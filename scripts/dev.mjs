import { spawn } from 'node:child_process';

// Accept the preview host's Vite-style flags while running Next.js.
const input = process.argv.slice(2);
const args = ['dev'];
for (let i = 0; i < input.length; i++) {
  if (input[i] === '--strictPort') continue;
  args.push(input[i] === '--host' ? '--hostname' : input[i]);
}
if (!args.includes('--port') && !args.includes('-p')) args.push('--port', '1009');
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
