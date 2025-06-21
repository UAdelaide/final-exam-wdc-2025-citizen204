const { exec } = require('child_process');


async function InitDB() {
exec('ls -lh /tmp', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
}

module.exports = InitDB;
