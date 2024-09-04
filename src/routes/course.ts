import { Router } from "express";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API for managing courses
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   courseId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Course Name"
 *                   department:
 *                     type: string
 *                     example: "Department Name"
 */
router.get("/", (req, res) => {
  // Placeholder for retrieving all courses
  const courses = [
    { courseId: 1, name: "Course 1", department: "Department 1" },
    { courseId: 2, name: "Course 2", department: "Department 2" },
  ];
  res.json(courses);
});

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course by ID
 *     description: Retrieve a specific course by its ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Course Name"
 *                 department:
 *                   type: string
 *                   example: "Department Name"
 *       404:
 *         description: Course not found
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Placeholder for retrieving a specific course by ID
  const course = { courseId: id, name: `Course ${id}`, department: `Department ${id}` };
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Create a new course
 *     description: Add a new course to the system
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Course"
 *               department:
 *                 type: string
 *                 example: "Department Name"
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "New Course"
 *                 department:
 *                   type: string
 *                   example: "Department Name"
 */
router.post("/", (req, res) => {
  const { name, department } = req.body;
  // Placeholder for creating a new course
  const newCourse = { courseId: 3, name, department };
  res.status(201).json(newCourse);
});

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Update an existing course
 *     description: Update the details of an existing course by its ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Course"
 *               department:
 *                 type: string
 *                 example: "Updated Department"
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Updated Course"
 *                 department:
 *                   type: string
 *                   example: "Updated Department"
 *       404:
 *         description: Course not found
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, department } = req.body;
  // Placeholder for updating an existing course
  const updatedCourse = { courseId: id, name, department };
  res.json(updatedCourse);
});

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: Remove a course from the system by its ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // Placeholder for deleting a course by ID
  res.status(204).send();
});

export default router;
