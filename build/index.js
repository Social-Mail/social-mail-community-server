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
        console.log(data.toString());
    });
    cd.stderr.on("data", (data) => {
        console.error(data.toString());
    });
    cd.on("error", (e) => {
        reject(e);
    })
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

try {
    console.log(`Initializing postgres`);

    // await new Promise((resolve) => setTimeout(resolve, 15000));

    await spawnPromise("/usr/local/bin/postgres-entrypoint.sh", [
        "-c",
        "archive_mode=on",
        "-c",
        "archive_command= %p /db-backup/%f"
    ], "database system is ready to accept connections");


    console.log(`Initializing social mail web server community edition.`);

    await import("@social-mail/social-mail-web-server/index.js");
} catch (error) {
    console.error(error);

    setInterval(() => console.log("Waiting..."), 10000);
}