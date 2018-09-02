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
        this.timer = -1;
    }
    go(url) {
        this.proc = spawn(this.app, [ "--silent-launch", url ]);
        this.proc.on("exit", (code) => {
            console.log("exit with", code);
            this.proc = null;
        });
        return this;
    }
    kill() {
        this.proc && this.proc.kill("SIGTERM");
        this.proc = null;
        return this;
    }
    timeout(ms = 5000) {
        this.timer = setTimeout(()=>{
            this.kill();
        }, ms);
        return this;
    }
}

function run_test() {
    let chrome = new Chrome();
    chrome.go("https://www.sogou.com").timeout();
}

//run_test();

module.exports = Chrome;

/************************************* END **************************************/

