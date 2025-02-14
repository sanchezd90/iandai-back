import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import chatController from './chatController';
import { csvToObjectArray } from '../utils/common';

dotenv.config();

interface OpenAIController {
  createOpenAIChat: (req: Request<{}, {}, CreateChatRequest>, res: Response) => Promise<void>;
  updateOpenAIChat: (req: Request<{ chatId: string }, {}, UpdateChatRequest>, res: Response) => Promise<void>;
  getHelp: (req: Request<{}, {}, GetHelpRequest>, res: Response) => Promise<void>;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface CreateChatRequest {
  systemMessageContent: string;
  userId: string;
  exerciseId: string;
  languageId: string;
}

interface UpdateChatRequest {
  messages: ChatMessage[];
}

interface GetHelpRequest {
  message: ChatMessage;
  type: string;
}

const createOpenAIChat: OpenAIController['createOpenAIChat'] = async (req: Request<{}, {}, CreateChatRequest>, res: Response): Promise<void> => {
  const { systemMessageContent, userId, exerciseId, languageId } = req.body;
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: systemMessageContent,
    }
  ];

  let retryCount = 0;
  const maxRetries = 2;

  while (retryCount < maxRetries) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 1.5,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });      
      const responseMessage = response.choices[0].message;      
      if (responseMessage?.content?.length && responseMessage.content.length > 200) {
        retryCount++;
        console.log(`Retrying (${retryCount}/${maxRetries}) due to a corrupted response`);
      } else {
        const chatPayload = {
          userId,
          exerciseId,
          languageId,
          messages: [...messages, responseMessage],
        };
        await chatController.createChat({ body: chatPayload } as any, res);
        return;
      }
    } catch (error) {
      console.error("Error during OpenAI API call:", error instanceof Error ? error.message : String(error));
      res.status(500).json({ message: 'Corrupted response' });
      return;
    }
  }

  console.error(`Failed to get a suitable response after ${maxRetries} retries`);
  res.status(500).json({ message: 'Failed to get a suitable response' });  
};

const updateOpenAIChat: OpenAIController['updateOpenAIChat'] = async (req: Request<{ chatId: string }, {}, UpdateChatRequest>, res: Response): Promise<void> => {             
  const { messages } = req.body;
  const { chatId } = req.params;
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map(message => ({ role: message.role, content: message.content })),
      temperature: 1.51,
      max_tokens: 350,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });           
    await chatController.updateChat({ params: { chatId }, body: { messages: [...messages, response.choices[0].message] } } as any, res);

  } catch (error) {
    console.error("Error during OpenAI API call:", error instanceof Error ? error.message : String(error));
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getHelp: OpenAIController['getHelp'] = async (req: Request<{}, {}, GetHelpRequest>, res: Response): Promise<void> => {             
  const { message, type } = req.body;
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [message],
      temperature: 1.51,
      max_tokens: 350,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });           
    if (response.choices?.[0]?.message) {      
      res.json(response.choices[0].message.content);      
    }
  } catch (error) {
    console.error("Error during OpenAI API call:", error instanceof Error ? error.message : String(error));
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const OpenAIController: OpenAIController = {
  createOpenAIChat,
  updateOpenAIChat,
  getHelp
};

export default OpenAIController; 