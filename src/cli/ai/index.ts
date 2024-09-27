import { Ollama } from '@langchain/ollama'
import { PromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import { input } from "@inquirer/prompts"
import ora from 'ora';

import { createBanner, createFooter, createQuestion, createTitle, createVersion } from '../../util';
import { useChatBg } from './useChatBg';

const llm = new Ollama({
    model: "qwen2.5",
})

export async function aiCommand() {

    const {aiPreset, INPUT, OUTPUT} = await useChatBg()

    const promptTemplate = new PromptTemplate({
        template: "\n这个历史消息记录:\n{chatHistory}\n 以下是用户的问题:\n{input}",
        inputVariables: ["chatHistory", "input"]
    })


    const history = new InMemoryChatMessageHistory()

    history.addAIMessage(aiPreset)

    const askQuestion = async (input: string) => {

        const chatHistory = await history.getMessages().then(messages => messages.map(message => message.content))

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
            return console.log(createFooter(), createTitle(), "已退出 !!!!!!", createFooter())
        }

        const spinner = ora("模型正在计算处理...").start()

        const response = await askQuestion(question)
            .then(message => {
                spinner.stop()
                return message
            })
            .catch(e => {
                spinner.stop()
                throw Error(e)
            })

        console.log(response);
    }
}
