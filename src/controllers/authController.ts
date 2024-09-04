import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import mongoose from 'mongoose';

interface Collection {
 name: string;
}

export const login = async (req: Request, res: Response) => {
 console.log('Login route hit');
 const { username, password } = req.body;

 if (typeof username !== 'string' || typeof password !== 'string') {
   return res.status(400).json({ message: 'Username and password must be strings' });
 }

 try {
   console.log("Username: ", username);
   const db = req.app.locals.db as mongoose.Connection;
   console.log("db: ", db)
   if (!db || !db.db) {
     throw new Error('Database connection is not available.');
   }

   const collections = await db.db.listCollections().toArray();
   console.log('Collections in the database:', collections);
  
   // const users = await User.find();
   // console.log('Users Collection:', users);

   const userCollection = db.collection('users');
   // console.log(userCollection)
   const userx = await userCollection.find().toArray()
   console.log('Users Collection:', userx );


   const user = await User.findOne({ username }).exec();
   console.log('User found:', user);

   if (!user) {
     return res.status(401).json({ message: 'Invalid username or password' });
   }

   const isMatch = await bcrypt.compare(password, user.password);
   console.log('Password match:', isMatch);

   if (!isMatch) {
     return res.status(401).json({ message: 'Invalid username or password' });
   }

   const token = jwt.sign(
     { id: user._id, role: user.role },
     // process.env.JWT_SECRET as string,
     'asdf',
     { expiresIn: '1h' }
   );

   return res.json({ token });

 } catch (error) {
   console.error('Server error:', error);
   return res.status(500).json({ message: 'Server error' });
 }
};



export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({ username, password: hashedPassword, role })
    await user.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}


// Define the function
export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, sort, filter, search } = req.query;

  // Pagination
  const pageNumber = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * pageSize;

  // Sorting
  const sortField = sort as string;
  const sortDirection = sortField?.startsWith('-') ? -1 : 1;
  const sortOptions: { [key: string]: 1 | -1 } = {
    [sortField?.replace(/^-/, '') || 'username']: sortDirection,
  };

  // Filtering
  const filterOptions = filter ? JSON.parse(filter as string) : {};

  // Searching
  const searchKeyword = search as string;
  const searchOptions = searchKeyword ? { $text: { $search: searchKeyword } } : {};

  try {
    const users = await User.find({ ...filterOptions, ...searchOptions })
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalUsers = await User.countDocuments({ ...filterOptions, ...searchOptions });

    res.json({
      users,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalUsers / pageSize),
      totalUsers,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};
