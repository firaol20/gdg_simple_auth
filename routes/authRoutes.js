// Auth routes
import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protect, logout); // logout requires a valid token to clear cookie

// Protected dashboard route
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.full_name}!`,
    user: req.user,
  });
});

export default router;