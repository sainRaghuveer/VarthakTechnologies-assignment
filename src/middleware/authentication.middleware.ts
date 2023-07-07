import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';


export interface AuthenticatedUser {
  userId: string;
  role: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

//User Authenticate middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Missing token.' });
  }

  try {
    const decoded: any = jwt.verify(token, "varthak");

    if (decoded) {
      const { userId, role } = decoded;

      req.user = { userId, role };
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};


//User Authorization middleware
export const authorization = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const  role :string[] = req.user?.role ?? [];
    console.log(role)
    const isAuthorized = role.some((role:string) => allowedRoles.includes(role));
    console.log(isAuthorized)

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Access denied. User does not have the required role.' });
    }

    next();
  };
};
