import { Request, Response } from 'express';
import { ObjectId} from "mongoose"
import bookModel from '../models/book.model';
import userModel from '../models/user.model';

// Create a book (accessible to users with "CREATOR" role)
export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const createdBy: string  = req.user?.userId ?? "";

  if (!title || !author || !createdBy) {
    return res.status(400).json({ message: 'Please provide title and author.' });
  }

  try {
    const book = await bookModel.create({ title, author, createdBy });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book.' });
  }
};

// View books created by the user (accessible to users with "VIEWER" role)
export const viewBooks = async (req: Request, res: Response) => {
  const createdBy:string = req.user?.userId ?? "";
  const userRoles: string[] = req.user?.role ?? [];

  try {
    let books: typeof bookModel[];

    if (userRoles.includes("VIEW_ALL")) {
      books = await bookModel.find().populate('createdBy', 'name');
    } else {
      books = await bookModel.find({ createdBy }).populate('createdBy', 'name');
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books.' });
  }
};

// Filter books based on creation time (accessible to users with any role)
export const filterBooks = async (req: Request, res: Response) => {
  const oldBooks = req.query.old;
  const newBooks = req.query.new;

  try {
    let books: typeof bookModel[];

    if (oldBooks) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      books = await bookModel.find({ createdAt: { $lte: tenMinutesAgo } });
    } else if (newBooks) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      books = await bookModel.find({ createdAt: { $gt: tenMinutesAgo } });
    } else {
      books = await bookModel.find();
    }

    res.status(200).json(books);
  } catch (error:any) {
    res.status(500).json({ message: 'Failed to filter books.', error:error.message });
  }
};
