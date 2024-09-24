import chalk from "chalk";
import figlet from 'figlet'

export function createBanner(): string {
    return chalk.hex("f75394").bold(figlet.textSync("Excel-Exporter"))
}