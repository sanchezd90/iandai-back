// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const googleCallback = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
  const googleProfile = req.user as any;    
  
  const email = googleProfile.emails[0].value;

  const existingUser = await User.findOne({ email }); 

  if (existingUser && !existingUser.googleId) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }

  let newUser = null;
  if (!existingUser) {
    newUser = await User.create({
      email,
      googleId: googleProfile.id,
      siteLanguage: '656cdbec8cba1818ac07f3fe',
      conversationLanguage: '656cdbec8cba1818ac07f3fe',
      tone: '67ae4c15fb72f35b72343f5c',
      level: 'A1',
      replies: '1',
      settingsAlert:true
    });
  }

  const token = jwt.sign(
    { id: (req.user as any).id, name: (req.user as any).displayName, user: existingUser ?? newUser },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect(process.env.FRONTEND_URL as string);
  });
};