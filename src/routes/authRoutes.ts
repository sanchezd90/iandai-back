import { Router } from 'express';
const authRouter = Router();

import passport from 'passport';
import { googleCallback, logout } from '../controllers/authController';

// Google Login Route
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);
authRouter.get('/logout', logout)

export default authRouter; 