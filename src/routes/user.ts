import { Router } from 'express';
import { body, query } from 'express-validator';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { register, login, getUsers } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User Management
 *     description: Register a new user with a username, password, and role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, faculty, student]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 */
router.post('/register', [
  body('username').isString(),
  body('password').isString(),
  body('role').isIn(['admin', 'faculty', 'student'])
], register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - User Management
 *     description: Login with username and password to receive a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token received
 *       401:
 *         description: Unauthorized
 */
router.post('/login', [
  body('username').isString(),
  body('password').isString()
], login);

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get list of users
 *     tags:
 *       - User Management
 *     description: Retrieve a list of users with optional filters
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search term
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: filter
 *         in: query
 *         description: Filter field
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         description: Sort order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/users', authenticateToken, authorizeRoles(['admin']), getUsers);


export default router;
