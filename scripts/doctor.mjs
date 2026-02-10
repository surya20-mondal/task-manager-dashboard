import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rootPkgPath = path.join(root, 'package.json');
const backendPkgPath = path.join(root, 'backend', 'package.json');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const results = [];

const push = (name, ok, detail) => {
  results.push({ name, ok, detail });
};

try {
  if (!fs.existsSync(rootPkgPath)) {
    push('Root package.json exists', false, `Missing at ${rootPkgPath}`);
  } else {
    push('Root package.json exists', true, rootPkgPath);
  }

  if (!fs.existsSync(backendPkgPath)) {
    push('Backend package.json exists', false, `Missing at ${backendPkgPath}`);
  } else {
    push('Backend package.json exists', true, backendPkgPath);
  }

  if (fs.existsSync(rootPkgPath)) {
    const pkg = readJson(rootPkgPath);
    const devScript = pkg?.scripts?.dev;
    const expected = 'node scripts/dev.mjs';
    push(
      'Root dev script is updated',
      devScript === expected,
      `Found: ${devScript || '(missing)'} | Expected: ${expected}`
    );
  }

  if (fs.existsSync(backendPkgPath)) {
    const backendPkg = readJson(backendPkgPath);
    const backendDev = backendPkg?.scripts?.dev;
    const expected = 'node --watch server.js';
    push(
      'Backend dev script is updated',
      backendDev === expected,
      `Found: ${backendDev || '(missing)'} | Expected: ${expected}`
    );
  }

  const envPath = path.join(root, 'backend', '.env');
  push('backend/.env exists', fs.existsSync(envPath), envPath);

  const bad = results.filter((x) => !x.ok);

  console.log('\n🩺 Task Manager Doctor');
  console.log(`📁 Current folder: ${root}\n`);

  for (const r of results) {
    console.log(`${r.ok ? '✅' : '❌'} ${r.name}`);
    console.log(`   ${r.detail}`);
  }

  if (bad.length === 0) {
    console.log('\n🎉 No obvious setup issues found.');
    process.exit(0);
  } else {
    console.log('\n⚠️ Issues found. Fix these and run again:');
    console.log('1) Make sure you are in the correct project folder (where this package.json is).');
    console.log('2) Pull latest code or re-download latest ZIP.');
    console.log('3) Run: npm run install:all');
    console.log('4) Run: npm run dev');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Doctor failed:', error.message);
  process.exit(1);
}
