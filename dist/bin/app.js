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
        const showBar = Math.floor(Math.random() * 10) > 8;
        const api = this.apiList[i].api + this.apiList[i].endPoints[ii];
        if (showBar) {
            const bar = new ProgressBar('[:bar] :rate/bps :percent :etas', { total: Math.floor(Math.random() * 100 + 1) + 30 });
            const timer = setInterval(function () {
                bar.tick();
                if (bar.complete) {
                    console.log('\ncomplete\n');
                    clearInterval(timer);
                }
            }, 100);
        }
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
