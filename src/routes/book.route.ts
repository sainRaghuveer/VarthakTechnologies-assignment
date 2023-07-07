import { Router } from 'express';
import { createBook, viewBooks, filterBooks } from '../controllers/book.controller';
import { authenticate, authorization } from '../middleware/authentication.middleware';


//Creating Book Route
const bookRouter = Router();

// Create a book (accessible to users with "CREATOR" role)
bookRouter.post('/books', authenticate, authorization(['CREATOR']), createBook);

// View books created by the user (accessible to users with "VIEWER" role)
bookRouter.get('/books', authenticate, authorization(['VIEWER']), viewBooks);

// View all books (accessible to users with "VIEW_ALL" role)
bookRouter.get('/books/all', authenticate, authorization(['VIEW_ALL']), viewBooks);

// Filter books based on creation time (accessible to users with any role)
bookRouter.get('/books/filter', authenticate, filterBooks);

export default bookRouter;
