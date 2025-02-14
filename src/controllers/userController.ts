import { Request, Response } from 'express';
import { IUser } from '../types/models';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;

interface UserController {    
  updateMe: (req: Request, res: Response) => void;
  deleteMe: (req: Request, res: Response) => void;
  createUser: (req: Request, res: Response) => void;
  login: (req: Request, res: Response) => void;
  logout: (req: Request, res: Response) => void;
  getMe: (req: Request, res: Response) => void;
}

const userController: UserController = {
  updateMe: async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.jwt;
      if (!token || !jwtSecretKey) {
        res.status(401).json({ message: 'Authentication token is missing' });
        return;
      }

      const decodedToken = jwt.verify(token, jwtSecretKey) as { userId: string };
      const userId = decodedToken.userId;

      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
        .populate('siteLanguage')
        .populate('conversationLanguage')
        .populate('tone');
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  },
  deleteMe: async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.jwt;
      if (!token || !jwtSecretKey) {
        res.status(401).json({ message: 'Authentication token is missing' });
        return;
      }

      const decodedToken = jwt.verify(token, jwtSecretKey) as { userId: string };
      const userId = decodedToken.userId;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Clear the JWT cookie
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });
      
      if (!existingUser) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      const token = generateJwtToken(existingUser);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      });
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  createUser: async (req: Request, res: Response): Promise<void> => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      res.status(400).json({ message: 'Email, password, and password confirmation are required' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User with this email already exists' });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        siteLanguage: '656cdbec8cba1818ac07f3fe',
        conversationLanguage: '656cdbec8cba1818ac07f3fe',
        tone: '67ae4c15fb72f35b72343f5c',
        level: 'A1',
        replies: '1'
      });

      const token = generateJwtToken(newUser);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getMe: async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.jwt;
      if (!token || !jwtSecretKey) {
        res.status(401).json({ message: 'Authentication token is missing' });
        return;
      }

      const decodedToken = jwt.verify(token, jwtSecretKey) as { userId: string };
      const userId = decodedToken.userId;
      console.log(mongoose.modelNames()); // Check if 'Tone' is in the list
      const user = await User.findById(userId)
        .select('-password')        
        .populate('siteLanguage')
        .populate('conversationLanguage')
        .populate('tone');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
};

const generateJwtToken = (user: IUser): string | null => {
  if (!jwtSecretKey) {
    console.error('JWT secret key is not initialized.');
    return null;
  }

  return jwt.sign(
    { userId: user._id, email: user.email },
    jwtSecretKey,
    { expiresIn: '1h' }
  );
};

export default userController; 