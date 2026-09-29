import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('====================================================');
console.log('       Starting GlowTrack Full-Stack Application     ');
console.log('====================================================');
console.log('  Backend will run at:   http://localhost:5000');
console.log('  Frontend will run at:  http://localhost:5173');
console.log('  Press Ctrl + C anytime to stop both servers.');
console.log('====================================================\n');

function runProcess(name, command, args, cwd, colorCode) {
  const proc = spawn(command, args, {
    cwd,
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe']
  });

  const prefix = `\x1b[${colorCode}m[${name}]\x1b[0m`;

  proc.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    for (const line of lines) {
      if (line.trim()) {
        console.log(`${prefix} ${line}`);
      }
    }
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    for (const line of lines) {
      if (line.trim()) {
        console.error(`${prefix} \x1b[31m${line}\x1b[0m`);
      }
    }
  });

  proc.on('close', (code) => {
    console.log(`${prefix} process exited with code ${code}`);
  });

  return proc;
}

// 1. Launch Backend (Port 5000)
const backendDir = path.join(__dirname, 'backend');
const backendProc = runProcess('Backend', npmCmd, ['start'], backendDir, '32'); // Green

// 2. Launch Frontend (Port 5173)
const frontendDir = path.join(__dirname, 'frontend');
const frontendProc = runProcess('Frontend', npmCmd, ['run', 'dev'], frontendDir, '36'); // Cyan

// Graceful termination handling
const cleanup = () => {
  console.log('\nStopping servers...');
  if (isWindows) {
    if (backendProc.pid) spawn('taskkill', ['/pid', backendProc.pid.toString(), '/T', '/F']);
    if (frontendProc.pid) spawn('taskkill', ['/pid', frontendProc.pid.toString(), '/T', '/F']);
  } else {
    backendProc.kill('SIGINT');
    frontendProc.kill('SIGINT');
  }
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
