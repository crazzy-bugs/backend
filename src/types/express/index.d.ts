import { UserRole } from '../src/models/User'; 

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
