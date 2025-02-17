import { Request, Response } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { IChat, JwtPayload } from '../types';
import Chat from '../models/chat';
import dotenv from 'dotenv';

dotenv.config();

interface ChatController {
  getAllChats: (req: Request, res: Response) => Promise<void>;
  getChatById: (req: Request, res: Response) => Promise<void>;
  createChat: (req: Request, res: Response) => Promise<void>;
  updateChat: (req: Request, res: Response) => Promise<void>;  
  getAllChatsForUser: (req: Request, res: Response) => Promise<void>;
}

const getAllChats: ChatController['getAllChats'] = async (req: Request, res: Response): Promise<void> => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getChatById: ChatController['getChatById'] = async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).json({ message: 'Chat not found' });
      return;
    }
    res.json(chat);    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });    
  }
};

const createChat: ChatController['createChat'] = async (req: Request, res: Response): Promise<void> => {
  try {
    const newChat = await Chat.create(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateChat: ChatController['updateChat'] = async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, req.body, { new: true });
    if (!updatedChat) {
      res.status(404).json({ message: 'Chat not found' });
      return;
    } 
    res.json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

const verifyJwt = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

const getAllChatsForUser: ChatController['getAllChatsForUser'] = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized - Bearer token missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyJwt(token);    
    const userId = decoded.userId;    
    const chats = await Chat.find({ userId });

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

const chatController: ChatController = {
  getAllChats,
  getChatById,
  createChat,
  updateChat,  
  getAllChatsForUser
};

export default chatController;