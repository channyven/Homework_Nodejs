import express from 'express';   //យក Express Framework មកប្រើ
import UserController from '../controllers/UserController.js';   //យក UserController មកប្រើ

const router = express.Router();  //បង្កើត Router Object
const userController = new UserController();  //បង្កើត object ពី class UserController

// Get all users
router.get('/users', (req, res) => userController.getUsers(req, res));

// Get user by ID
router.get('/users/:id', (req, res) => userController.getUserById(req, res));

// Create new user
router.post('/users', (req, res) => userController.createUser(req, res));

// Update user
router.put('/users/:id', (req, res) => userController.updateUser(req, res));

// Delete user
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

export default router;