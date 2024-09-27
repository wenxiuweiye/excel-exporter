#!/usr/bin/env node

import { Command } from 'commander'
import { tableCommander } from './table'
import { aiCommand } from './ai';
import { createBanner, createVersion } from '../util';

const program = new Command()

program
    .name("excel-export")
    .description("一个智能且强大的excel处理终端程序")
    .version(createVersion(), "-V, --version", "查看当前版本号")
    .helpOption("-h, --help", "获取此 CLI 帮助")
    .addHelpText("beforeAll", createBanner())
    .addHelpText("beforeAll", createVersion())

program
    .command("table")
    .description("")
    .action(
        () => {
            console.log(createBanner());
            console.log(createVersion());
            tableCommander()

        }
    )

program
    .command("ai")
    .description("与本地私有ai进行对话")
    .action(
        () => {
            console.log(createBanner());
            console.log(createVersion());
            aiCommand()
        }
    )

program.parse()

