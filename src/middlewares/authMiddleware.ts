import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to check if user is authenticated
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Forbidden
    (req as any).user = user;
    next();
  });
};

// Middleware to check if user has required role
export const authorizeRoles = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (roles.includes((req as any).user.role)) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};
