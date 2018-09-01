/*
 *********************************************************************************
 *                     Copyright (C) 2018 wystan
 *
 *       filename: browser.js
 *    description:
 *        created: 2018-09-01 22:06:08
 *         author: wystan
 *
 *********************************************************************************
 */

const spawn = require("child_process").spawn;
const os = require("os");
const program = {
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    linux: "google-chrome"
};

class Chrome {
    constructor() {
        this.app = program[os.platform()];
        this.proc = null;
    }
    go(url) {
        this.proc = spawn(this.app, [ url ]);
        this.proc.on("exit", (code) => {
            console.log("exit with", code);
        });
    }
    kill() {
        this.proc && this.proc.kill("SIGINT");
    }
}

function run_test() {
    let chrome = new Chrome();
    chrome.go("https://www.sogou.com");
    setTimeout(()=>{ chrome.kill(); }, 5000);
}

module.exports = Chrome;

/************************************* END **************************************/
