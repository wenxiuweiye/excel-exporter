
import chalk from "chalk";
import figlet from 'figlet'
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";

export const createBanner = () =>{
    return chalk.hex("f75394").bold(figlet.textSync("Excel  Exporter"))
}

export const createTitle = () => {
    return chalk.hex("f75394").bold("[ excel-exporter ]:")
}

export const createVersion =  () => {
    const version = JSON.parse( readFileSync(resolve(cwd(), "./package.json"),"utf-8")).version
    return createTitle() + chalk.blue(` V${version}`)
}

export const createQuestion = (message: string) => {
    return chalk.green.bold(message)
}

export const createFooter = () => {
    let str = ""
    for (let index = 0; index < process.stdout.columns/4; index++) {
        str += "="
    }

    return str
}