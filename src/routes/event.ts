import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Event
 *     description: Retrieve a list of all events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Hackathon"
 *                   description:
 *                     type: string
 *                     example: "Annual Hackathon Event"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-10"
 *                   location:
 *                     type: string
 *                     example: "Main Auditorium"
 */
router.get("/", (req, res) => {
  // Placeholder for retrieving all events
  const events = [
    { eventId: 1, name: "Hackathon", description: "Annual Hackathon Event", date: "2024-09-10", location: "Main Auditorium" },
    { eventId: 2, name: "Cultural Fest", description: "Annual Cultural Fest", date: "2024-11-15", location: "Campus Grounds" },
  ];
  res.json(events);
});

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags:
 *       - Event
 *     description: Retrieve a specific event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Hackathon"
 *                 description:
 *                   type: string
 *                   example: "Annual Hackathon Event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-09-10"
 *                 location:
 *                   type: string
 *                   example: "Main Auditorium"
 *       404:
 *         description: Event not found
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Placeholder for retrieving a specific event by ID
  const event = { eventId: id, name: `Event ${id}`, description: "Event Description", date: "2024-09-10", location: "Main Auditorium" };
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Event
 *     description: Add a new event to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Event"
 *               description:
 *                 type: string
 *                 example: "Description of the new event"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *               location:
 *                 type: string
 *                 example: "Conference Hall"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "New Event"
 *                 description:
 *                   type: string
 *                   example: "Description of the new event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-15"
 *                 location:
 *                   type: string
 *                   example: "Conference Hall"
 */
router.post("/", (req, res) => {
  const { name, description, date, location } = req.body;
  // Placeholder for creating a new event
  const newEvent = { eventId: 3, name, description, date, location };
  res.status(201).json(newEvent);
});

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags:
 *       - Event
 *     description: Update the details of an existing event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Event"
 *               description:
 *                 type: string
 *                 example: "Updated description of the event"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-01"
 *               location:
 *                 type: string
 *                 example: "Updated location"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Updated Event"
 *                 description:
 *                   type: string
 *                   example: "Updated description of the event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-11-01"
 *                 location:
 *                   type: string
 *                   example: "Updated location"
 *       404:
 *         description: Event not found
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, date, location } = req.body;
  // Placeholder for updating an existing event
  const updatedEvent = { eventId: id, name, description, date, location };
  res.json(updatedEvent);
});

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Event
 *     description: Remove an event from the system by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // Placeholder for deleting an event by ID
  res.status(204).send();
});

export default router;
