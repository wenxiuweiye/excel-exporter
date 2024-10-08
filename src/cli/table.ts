import { input } from "@inquirer/prompts"
import { createQuestion } from "../util"
import { Workbook } from "exceljs"
import { table } from "table"

export async function tableCommander() {

    const workbookUrl = await input({
        message: createQuestion("🍋 输入excel工作簿地址")
    })

    const sheetName = await input({
        message: createQuestion("🍉 输入sheet 名字")
    })

    const from = await input({
        message: createQuestion("🍍 输入开始的行数"),
    })

    const to = await input({
        message: createQuestion("🍓 输入结束的行数"),
    })

    const cols: number[] = []

    let isGetCol = true

    while (isGetCol) {
        const col = await input({
            message: createQuestion( "输入期望渲染的列, 若无直接回车")
        })

        if (!col) {
            isGetCol = false
        }
        else {
            cols.push(Number(col))
        }

    }

    const wb = new Workbook()

    try {
        wb.xlsx.readFile(`${workbookUrl}`)
    } catch (e) {
        throw new TypeError("There might be a problem with the workbook url")
    }

    const xlsx = await wb.xlsx.readFile(`${workbookUrl}`)

    const data: string[][] = []

    xlsx.getWorksheet(`${sheetName}`)?.eachRow((row, index) => {

        if (Number(from) <= index && index <= Number(to)) {

            data.push(cols.map((value) => `${row.getCell(value)}`))

        }

    })

    console.log(table(data))

}