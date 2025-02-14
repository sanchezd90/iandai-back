// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const googleCallback = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }

  const token = jwt.sign(
    { id: (req.user as any).id, name: (req.user as any).displayName },
    process.env.JWT_SECRET as string,
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