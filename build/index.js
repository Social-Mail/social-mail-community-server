import { spawn } from 'node:child_process';

// start postgres....
const spawnPromise = (path, args, waitTill) => new Promise((resolve, reject) => {
    const cd = spawn(path, args);
    let waiting = true;
    cd.stdout.on("data", (data) => {
        if (waiting) {
            if (data.indexOf(waitTill) !== -1) {
                waiting = false;
                resolve(cd);
            }
        }
        console.log(`${path}: ${data}`);
    });
    cd.stderr.on("data", (data) => {
        console.error(`${path}: ${data}`);
    });
    cd.on("close", (n) => {
        if (n>0) {
            reject();
            return;
        }
        if(waiting) {
            waiting = false;
            resolve();
        }
    });
});

console.log(`Initializing postgres`);

await spawnPromise("postgres", [
    "-c",
    "archive_mode=on",
    "-c",
    "archive_command= %p /data/db/archive/%f"
], "database system is ready to accept connections");

console.log(`Initializing social mail web server community edition.`);

await import("@social-mail/social-mail-web-server/index");