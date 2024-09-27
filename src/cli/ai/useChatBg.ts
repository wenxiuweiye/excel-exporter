import { select } from "@inquirer/prompts"
import { createQuestion } from "../../util"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { parse } from "yaml"

export const useChatBg = async () => {
    
    const aiPreset = await select({
        message: createQuestion("💐选择你的 ai 预设"),
        choices: [
            {
                name: "服装数据分析师",
                value: "你是一个专业的服装数据分析师"
            },
            {
                name: "软件工程师",
                value: "你是一个专业的软件工程师，请你根据历史消息记录回答用户问题。"
            },
            {
                name: "从配置中读取",
                value: parse(await readFile(resolve(__dirname, "../../config/ai.yaml"), { encoding: "utf-8" })).aiPreset
            }
        ]
    })

    const INPUT = await select({
        message: createQuestion("选择本次对话记忆导入"),
        choices: [
            {
                name: "不导入",
                value: undefined
            },
            {
                name: "导入本地文件",
                value: "file"
            },
            {
                name: "导入 Milvus",
                value: "milvue"
            }
        ]
    })

    const OUTPUT = await select({
        message: createQuestion("选择本次对话的存储方式"),
        choices: [
            {
                name: "不保存",
                value: undefined
            },
            {
                name: "保存至本地文件",
                value: "file"
            },
            {
                name: "保存至 Milvus",
                value: "milvue"
            }
        ]
    })

    return {
        aiPreset,
        INPUT,
        OUTPUT
    }
}