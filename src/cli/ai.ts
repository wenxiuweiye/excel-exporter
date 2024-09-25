import { Ollama } from '@langchain/ollama'
import { PromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import { input, select } from "@inquirer/prompts"
import { resolve } from 'node:path';
import { parse } from 'yaml'
import { readFile } from 'node:fs/promises';
import chalk from 'chalk'
import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'
import cliSpinners from 'cli-spinners';

import { createBanner, createQuestion } from '../util';

const llm = new Ollama({
    model: "qwen2.5",
})

async function main() {

    console.log(createBanner());


    const background = await select({
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
                value: parse(await readFile(resolve(__dirname, "../../config/ai.yaml"), { encoding: "utf-8" })).backgroundSelect
            }
        ]
    })

    const promptTemplate = new PromptTemplate({
        template: "\n这个历史消息记录:\n{chatHistory}\n 以下是用户的问题:\n{input}",
        inputVariables: ["chatHistory","input"]
    })

    
    const history = new InMemoryChatMessageHistory()

    history.addAIMessage(background)

    const askQuestion = async (input: string) => {

        const chatHistory = await history.getMessages().then( messages => messages.map( message => message.content ) )

        const formattedPrompt = await promptTemplate.format({
            chatHistory,
            input
        })

        const response = await llm.invoke(formattedPrompt)

        history.addAIMessage(response)

        return response
    }

    while (true) {

        const question = await input({ message: createQuestion("🌸输入您的问题 (输入exit即可退出)"), })

        if (question === "exit") {
            return console.log("----------", chalk.hex("f75394").bold("[excel-exporter]:"), "已退出 !!!!!!", "----------")
        }

        console.log(await askQuestion(question));
    }
}

main()