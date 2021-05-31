"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const commander = require("commander");
const axios_1 = require("axios");
const ProgressBar = require("progress");
class App {
    constructor() {
        this.program = commander;
        this.package = require('../../package.json');
        this.apiList = require('../../api-list.json');
    }
    initialize() {
        this.program
            .version(this.package.version)
            .option('-m, --message [value]', 'Say hello!')
            .parse(process.argv);
        this.getData();
    }
    getData() {
        const i = Math.floor(Math.random() * this.apiList.length);
        const ii = Math.floor(Math.random() * this.apiList[i].endPoints.length);
        const oneToOneHundred = Math.floor(Math.random() * 100 + 1);
        const api = this.apiList[i].api + this.apiList[i].endPoints[ii];
        if (oneToOneHundred > 95) {
            const bar = new ProgressBar('[:bar] :rate/bps :percent :etas', {
                total: process.stdout.columns,
            });
            const timer = setInterval(() => {
                bar.tick();
                if (bar.complete) {
                    clearInterval(timer);
                    process.stdout.write(`
      MMM.           .MMM
      MMMMMMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMMMMMM      ___________________________________
     MMMMMMMMMMMMMMMMMMMMM    |                                   |
    MMMMMMMMMMMMMMMMMMMMMMM   | Avoid administrative distraction. |
   MMMMMMMMMMMMMMMMMMMMMMMM   |_   _______________________________|
   MMMM::- -:::::::- -::MMMM    |/
    MM~:~   ~:::::~   ~:~MM
.. MMMMM::. .:::+:::. .::MMMMM ..
     .MM::::: ._. :::::MM.
        MMMM;:::::;MMMM
 -MM        MMMMMMM
 ^  M+     MMMMMMMMM
     MMMMMMM MM MM MM
          MM MM MM MM
          MM MM MM MM
       .~~MM~MM~MM~MM~~.
    ~~~~MM:~MM~~~MM~:MM~~~~
   ~~~~~~==~==~~~==~==~~~~~~
    ~~~~~~==~==~==~==~~~~~~
        :~==~==~==~==~~`);
                    this.callApi(api);
                }
            }, 25);
        }
        else {
            this.callApi(api);
        }
    }
    callApi(api) {
        axios_1.default.get(api)
            .then((data) => {
            Object.keys(data.data).forEach((key) => {
                process.stdout.write(`${key}: ${data.data[key]}`);
            });
            this.getData();
        })
            .catch((err) => {
            console.log(err.message || err);
        });
    }
}
exports.App = App;
const app = new App();
app.initialize();
