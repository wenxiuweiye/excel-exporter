import { Ollama } from '@langchain/ollama'
import { PromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import { input, select } from "@inquirer/prompts"
import { resolve } from 'node:path';
import { parse } from 'yaml'
import { readFile } from 'node:fs/promises';

const llm = new Ollama({
    model: "qwen2.5",
})

const history = new InMemoryChatMessageHistory()

async function main() {
    const background = await select({
        message: "选择你的 ai 预设",
        choices: [
            {
                name: "💐服装数据分析师",
                value: "你是一个专业的服装数据分析师，请你回答以下内容:\n{input}"
            },
            {
                name: "🌸软件工程师",
                value: "你是一个专业的软件工程师，请你回答以下内容:\n{input}"
            },
            {
                name: "💮从配置中读取",
                value: parse(await readFile(resolve(__dirname, "../../config/ai.yaml"), { encoding: "utf-8" })).backgroundSelect
            }
        ]
    })

    const prompt = PromptTemplate.fromTemplate(
        background
    )

    const dataAnalytics = async (input: string) => {
        return await prompt.pipe(llm).invoke({
            input
        })
    }

    while (true) {

        const question = await input({ message: "输入您的问题", })

        if (question === "exit") {
            console.log("[excel-exporter]: 已退出")
            process.kill(process.pid)
        }

        console.log(await dataAnalytics(question));

    }
}


main()