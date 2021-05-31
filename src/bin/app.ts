import * as commander from 'commander';
import { Writer } from '../writer';

export class App {

  private program: commander.CommanderStatic;
  private package: { [version: string]: string };
  private writer: Writer;

  constructor() {
    this.program = commander;
    this.package = require('../../package.json');
    this.writer = new Writer();
  }

  public initialize(): void {
    this.program
      .version(this.package.version)
      .option('-m, --message [value]', 'Say hello!')
      .parse(process.argv);

    if (this.program.message != null) {

      if (typeof this.program.message !== 'string') {
        this.writer.write();
      } else {
        this.writer.write(this.program.message);
      }

      process.exit();
    }

    this.program.help();
  }
}

const app = new App();
app.initialize();
