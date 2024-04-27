import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor.js';
import { ICommandExec } from '../../core/executor/command.types.js';
import { IStreamLogger } from '../../core/handlers/streamLogger.interface.js';
import { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types.js';
import { FileService } from '../../core/files/file.service.js';
import { PromptService } from '../../core/prompt/prompt.service.js';
import { FfmpegBuilder } from './ffmpeg.builder.js';
import { StreamHandler } from '../../core/handlers/stream.handler.js';

const EXTENSION: string = 'mp4'

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {

    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Width', 'number');
        const height = await this.promptService.input<number>('Height', 'number');
        const path = await this.promptService.input<string>('Path to file', 'input');
        const name = await this.promptService.input<string>('Filename', 'input');
        return {width, height, path, name};
    }
    protected build(input: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(input.path, input.name, EXTENSION);
        const args = (new FfmpegBuilder)
            .input(input.path)
            .setVideoSize(input.width, input.height)
            .output(output);
        return {command: 'ffmpeg', args, output};
    }
    protected spawn(command: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(command.output);
        return spawn(command.command, command.args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
    
}