const { exec } = require('child_process');


async function InitDB() {
exec('mysql < init_db.sql', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log("Create database finish.");
});
}

module.exports = InitDB;
