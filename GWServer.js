/**
 * GitLab CE Webhook Server v0.1.0
 * GitLab CE local Webhook Server based on NodeJS to
 * trigger some tasks when repo is updated.
 * start this server by running `node GWServer.js`
 *
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 23 May, 2016
 * License: MIT
 *
 * Main Server Script.
 */

var config = require("./config.json"),
    os = require("os"),
    http = require("http"),
    shell = require("shelljs"),
    port = config.listenerPort,
    fnProcessRequest,
    server;

server = http.createServer(function(request, response) {
    var reqHeaders = request.headers,
        reqBody = [];

    request
    .on('data', function(chunk) {
        reqBody.push(chunk);
    })
    .on('end', function() {
        reqBody = JSON.parse(Buffer.concat(reqBody).toString());
        response.statusCode = 200;
        response.end();
    });
});

server.listen(port, function() {
    console.info("%s started on %s:%d at %s", config.serverTitle, os.hostname(), port, new Date());
});
