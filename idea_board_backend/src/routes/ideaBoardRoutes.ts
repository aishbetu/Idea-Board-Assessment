import { Router } from 'express';
import { createIdea, listIdeas, upVoteIdea } from '../controllers/ideaBoardController';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/new', errorHandler, createIdea);
router.get('/', errorHandler, listIdeas);
router.put('/upvote/:id', errorHandler, upVoteIdea);

export default router;
