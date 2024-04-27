import { DirExecuter } from './commands/dir/dir.executor.js';
import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor.js';
import { ConsoleLogger } from './out/consoleLogger/consoleLogger.js';

export class App {
    async run() {
        new DirExecuter(ConsoleLogger.getInstance()).execute();
    }
}

const app = new App();
app.run(); 