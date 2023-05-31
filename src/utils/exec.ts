import shell from 'shelljs'

export function getCurrentBranch() {
  return new Promise((resolve, reject) => {
    const command = 'git rev-parse --abbrev-ref HEAD';

    const child = shell.exec(command, { async: true }, (code, stdout, stderr) => {
      stdout = stdout.toString().trimEnd();
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(stderr || stdout));
      }
    });

    // child.stdout.on('data', stdout => console.log('success=', stdout.toString().trimEnd(), { isExternal: true }));
    // child.stderr.on('data', stderr => console.log('error=', stderr.toString().trimEnd(), { isExternal: true }));

  });
}
