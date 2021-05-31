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

    // if (this.program.message != null) {

    //   if (typeof this.program.message !== 'string') {
    //     this.writer.write();
    //   } else {
    //     this.writer.write(this.program.message);
    //   }

    //   process.exit();
    // }

    // this.program.help();
    // eslint-disable-next-line no-constant-condition
    // while (1 > 0) {
    //   axios.get(this.apiList[0])
    //     .then((res: any) => {
    //       console.log('🚀 ~ file: app.ts ~ line 41 ~ App ~ .then ~ res', res);

    //     })
    //     .catch((err: Error) => {
    //       console.log(err.message || err);
    //     });
    // }
    this.getData();
  }

  private getData(): void {
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
