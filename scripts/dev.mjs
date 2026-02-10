import { spawn } from 'node:child_process';

const run = (name, command, args) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${name} exited with code ${code}`);
    }
  });

  return child;
};

const backend = run('backend', 'npm', ['--prefix', 'backend', 'run', 'dev']);
const frontend = run('frontend', 'npm', ['--prefix', 'frontend', 'run', 'dev']);

const shutdown = () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
