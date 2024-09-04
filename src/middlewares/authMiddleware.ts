import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'asdf';

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
}


interface JwtPayload {
  id: string;
  role: UserRole;
}

export const authorizeRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) 
      return res.status(403).json({ message: 'Access denied, token missing!' });

    try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
     
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient privileges!' });
      }
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Access denied, token invalid!' });
    }
  };
};
