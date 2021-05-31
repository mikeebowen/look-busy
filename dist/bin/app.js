"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const commander = require("commander");
const axios_1 = require("axios");
const Image = require('ascii-art-image');
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
        return __awaiter(this, void 0, void 0, function* () {
            const i = Math.floor(Math.random() * this.apiList.length);
            const ii = Math.floor(Math.random() * this.apiList[i].endPoints.length);
            const oneToOneHundred = Math.floor(Math.random() * 100 + 1);
            const api = this.apiList[i].api + this.apiList[i].endPoints[ii];
            if (oneToOneHundred > 95) {
                let complete = false;
                const waitSymbols = ['︷', '︵', '︹', '︺', '︶', '︸', '︶', '︺', '︹', '︵'];
                let i = 0;
                process.stdout.write('\n');
                const timer = setInterval(() => {
                    process.stdout.write(waitSymbols[i]);
                    i = ++i < waitSymbols.length ? i : 0;
                    if (complete) {
                        clearInterval(timer);
                        setTimeout(() => {
                            this.callApi(api);
                        }, 3000);
                    }
                }, 100);
                try {
                    const response = yield axios_1.default.get('https://thatcopy.pw/catapi/rest/');
                    const image = new Image({
                        filepath: response.data.url,
                        alphabet: 'variant4',
                    });
                    image.write((err, rendered) => {
                        if (err) {
                            return console.error(err.message || err);
                        }
                        complete = true;
                        process.stdout.write('\n' + rendered);
                    });
                }
                catch (error) {
                    console.error(error.message || error);
                }
            }
            else {
                this.callApi(api);
            }
        });
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
