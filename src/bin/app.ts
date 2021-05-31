import * as commander from 'commander';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Image = require('ascii-art-image');

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

  private async getData(): Promise<void> {
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
        const response = await axios.get('https://thatcopy.pw/catapi/rest/');
        const image = new Image({
          filepath: response.data.url,
          alphabet: 'variant4',
        });

        image.write((err: Error, rendered: string) => {
          if (err) {
            return console.error(err.message || err);
          }
          complete = true;
          process.stdout.write('\n' + rendered);
        });
      } catch (error) {
        console.error(error.message || error);
      }

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
