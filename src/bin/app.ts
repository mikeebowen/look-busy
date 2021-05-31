import * as commander from 'commander';
import axios from 'axios';
import * as ProgressBar from 'progress';

export class App {

  private program: commander.CommanderStatic;
  private package: { version: string };
  private apiList: { api: string, endPoints: string[] }[];

  constructor() {
    this.program = commander;
    this.package = require('../../package.json');
    this.apiList = require('../../api-list.json');
  }

  public initialize(): void {
    this.program
      .version(this.package.version)
      .option('-m, --message [value]', 'Say hello!')
      .parse(process.argv);

    this.getData();
  }

  private getData(): void {
    const i = Math.floor(Math.random() * this.apiList.length);
    const ii = Math.floor(Math.random() * this.apiList[i].endPoints.length);
    const showBar = Math.floor(Math.random() * 100 + 1) > 95;
    const api = this.apiList[i].api + this.apiList[i].endPoints[ii];
    if (showBar) {
      const bar = new ProgressBar(
        '[:bar] :rate/bps :percent :etas',
        {
          total: process.stdout.columns,
        },
      );
      const timer = setInterval(() => {
        bar.tick();
        if (bar.complete) {
          clearInterval(timer);
          this.callApi(api);
        }
      }, 25);
    } else {
      this.callApi(api);
    }
  }

  private callApi(api: string): void {

    axios.get(api)
      .then((data: any) => {
        Object.keys(data.data).forEach((key: string) => {
          process.stdout.write(`${key}: ${data.data[key]}`);
        });
        this.getData();
      })
      .catch((err: Error) => {
        console.log(err.message || err);
      });
  }
}

const app = new App();
app.initialize();
