#!/usr/bin/env node

declare const __APP_VERSION__: string;

import { Command } from 'commander';
import { render } from './renderer.ts';

const program = new Command();

program
    .name('webpress')
    .description('Render local HTML to PNG images')
    .version(__APP_VERSION__)
    .requiredOption('-i, --input <path>', 'Input HTML file path')
    .requiredOption('-o, --output <path>', 'Output PNG file path')
    .option('-p, --preset <name>', 'Image preset (og, infographic, poster, banner, twitter, youtube, xiaohongshu, wechat)', 'og')
    .option('--width <number>', 'Custom width in pixels')
    .option('--height <number>', 'Custom height in pixels')
    .option('--scale <number>', 'Device scale factor', '2')
    .option('--wait-until <state>', 'Navigation waitUntil (load, domcontentloaded, networkidle)', 'networkidle')
    .option('--timeout <ms>', 'Navigation timeout in milliseconds', '30000')
    .option('--safe', 'Disable external network requests and JavaScript execution')
    .action(async (options) => {
        try {
            const timeout = Number.parseInt(options.timeout, 10);
            if (!Number.isFinite(timeout) || timeout < 0) {
                throw new Error('Invalid --timeout value. Use a non-negative integer in milliseconds.');
            }

            const result = await render({
                input: options.input,
                output: options.output,
                preset: options.preset,
                width: options.width ? parseInt(options.width, 10) : undefined,
                height: options.height ? parseInt(options.height, 10) : undefined,
                scale: parseFloat(options.scale),
                waitUntil: options.waitUntil,
                timeout,
                safe: options.safe,
            });
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : error);
            process.exit(1);
        }
    });

program.parse();
