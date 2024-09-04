import { Router } from "express";
import { authorizeRole } from '../middlewares/authMiddleware';
import { UserRole } from '../models/User';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Example
 *     description: Example endpoints
 *   - name: Admin
 *     description: Admin specific endpoints
 *   - name: Faculty
 *     description: Faculty specific endpoints
 *   - name: Student
 *     description: Student specific endpoints
 *   - name: Superadmin
 *     description: Superadmin specific endpoints
 */

/**
 * @swagger
 * /test/example:
 *   get:
 *     tags:
 *       - Example
 *     summary: Get example data
 *     description: Retrieve example data from the server
 *     responses:
 *       200:
 *         description: Example data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
router.get("/example", (req, res) => {
  res.json({ message: "Hello World" });
});

/**
 * @swagger
 * /test/example:
 *   post:
 *     tags:
 *       - Example
 *     summary: Create example data
 *     description: Create example data on the server
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Hello World
 *     responses:
 *       201:
 *         description: Example data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
router.post("/example", (req, res) => {
  res.status(201).json(req.body);
});

/**
 * @swagger
 * /test/superadmin:
 *   get:
 *     tags:
 *       - Superadmin
 *     summary: Access superadmin-only route
 *     description: This route is accessible only to users with the Superadmin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success message for superadmin route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is a superadmin-only route
 *       403:
 *         description: Forbidden access
 */
router.get('/superadmin', authorizeRole([UserRole.SAD]), (req, res) => {
  res.send('This is a superadmin-only route');
});

/**
 * @swagger
 * /test/admin:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Access admin-only route
 *     description: This route is accessible only to users with the Admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success message for admin route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is an admin-only route
 *       403:
 *         description: Forbidden access
 */
router.get('/admin', authorizeRole([UserRole.AD]), (req, res) => {
  res.send('This is an admin-only route');
});

/**
 * @swagger
 * /test/faculty:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Access faculty-only route
 *     description: This route is accessible only to users with the Faculty role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success message for faculty route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is a route for faculty
 *       403:
 *         description: Forbidden access
 */
router.get('/faculty', authorizeRole([UserRole.FAC]), (req, res) => {
  res.send('This is a route for faculty');
});

/**
 * @swagger
 * /test/student:
 *   get:
 *     tags:
 *       - Student
 *     summary: Access student-only route
 *     description: This route is accessible only to users with the Student role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success message for student route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is a route for student
 *       403:
 *         description: Forbidden access
 */
router.get('/student', authorizeRole([UserRole.STD]), (req, res) => {
  res.send('This is a route for student');
});

export default router;
