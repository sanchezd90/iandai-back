import { Router } from 'express';
const router = Router();
import { googleCallback, logout } from '../controllers/authController';
import { Request, Response } from 'express';

import userController from '../controllers/userController';
import languageController from '../controllers/languageController';
import chatController from '../controllers/chatController';
import exerciseController from '../controllers/exerciseController';
import openaiController from '../controllers/openaiController';
import activityController from '../controllers/activityController';
import toneController from '../controllers/toneController';
import passport from 'passport';
import wordController from '../controllers/wordController';
import expressionController from '../controllers/expressionController';
import subjectController from '../controllers/subjectController';
// User Routes
router.get('/users/me', userController.getMe);
router.put('/users/me', userController.updateMe);
router.delete('/users/me', userController.deleteMe);
router.post('/users/signup', userController.createUser);
router.post('/users/auth', userController.login);
router.post('/users/logout', userController.logout);

// Language Routes
router.get('/languages', languageController.getAllLanguages);
router.get('/languages/:languageId', languageController.getLanguageById);
router.post('/languages', languageController.createLanguage);
router.put('/languages/:languageId', languageController.updateLanguage);
router.delete('/languages/:languageId', languageController.deleteLanguage);

// Chat Routes
router.get('/chats', chatController.getAllChats);
router.get('/chats/:chatId', chatController.getChatById);
router.post('/chats', chatController.createChat);
router.post('/chats/user', chatController.getAllChatsForUser);
router.put('/chats/:chatId', chatController.updateChat);
router.delete('/chats/:chatId', chatController.deleteChat);

// Exercise Routes
router.get('/exercises', exerciseController.getAllExercises);
router.get('/exercises/:exerciseId', exerciseController.getExerciseById);
router.post('/exercises', exerciseController.createExercise);
router.put('/exercises/:exerciseId', exerciseController.updateExercise);
router.delete('/exercises/:exerciseId', exerciseController.deleteExercise);

// Activity Routes
router.get('/activities/', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.post('/activities/', activityController.createActivity);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

router.post('/openai', openaiController.createOpenAIChat);
router.put('/openai/:chatId', openaiController.updateOpenAIChat);
router.post('/openai/help', openaiController.getHelp);

// Tone Routes
router.get('/tones', toneController.getAll);

// Subject Routes
router.get('/subjects', subjectController.getAll);
router.get('/subjects/:subjectId', subjectController.getSubjectById);
router.post('/subjects', subjectController.createSubject);
router.put('/subjects/:subjectId', subjectController.updateSubject);
router.delete('/subjects/:subjectId', subjectController.deleteSubject);

// Google Login Route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);
router.get('/auth/logout', logout)

// Word Routes
router.get('/words', wordController.getAllWords);
router.get('/words/:wordId', wordController.getWordById);
router.post('/words', wordController.createWord);
router.put('/words/:wordId', wordController.updateWord);
router.delete('/words/:wordId', wordController.deleteWord);

// Expression Routes
router.get('/expressions', expressionController.getAllExpressions);
router.get('/expressions/:expressionId', expressionController.getExpressionById);
router.post('/expressions', expressionController.createExpression);
router.put('/expressions/:expressionId', expressionController.updateExpression);
router.delete('/expressions/:expressionId', expressionController.deleteExpression);

// Root Route
router.get('/', (_req: Request, res: Response): void => {
    res.send('Welcome to AINDAI API!');
});

export default router; 