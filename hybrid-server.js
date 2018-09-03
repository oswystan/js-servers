/*
 *********************************************************************************
 *                     Copyright (C) 2018 wystan
 *
 *       filename: hybrid-server.js
 *    description:
 *        created: 2018-09-03 23:15:49
 *         author: wystan
 *
 *********************************************************************************
 */

const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const ws = require("express-ws");

class HybridServer {
    constructor(cert, wsflag=false) {
        let app = express();
        let server = null;
        if (cert && cert.key && cert.cert) {
            let creditials = {
                key: fs.readFileSync(__dirname + '/' + cert.key, 'utf8'),
                cert: fs.readFileSync(__dirname + '/' + cert.cert, 'utf8')
            }
            server = https.createServer(creditials, app);
        } else {
            server = http.createServer(app);
        }
        if (wsflag) {
            ws(app, server);
        }
        app.use(express.static(__dirname + "/static"));
        this.app = app;
        this.server = server;
    }

    listen(port) {
        this.port = port;
        this.server && this.server.listen(port);
    }

    ws(url, handler) {
        return this.app.ws(url, handler);
    }
}

module.exports = HybridServer;

/************************************* END **************************************/

