import {NextFunction, Request, Response} from 'express'
import {Comment} from '../models';
import {CommentService} from "../services";

const commentService = new CommentService();

class CommentController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await commentService.fetch(req.params.article));
        }
        catch(err){
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try{
            const created = await commentService.create(req.body.comment);
            res.send(created);
        }
        catch(err){
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = await commentService.update(req.params.id, req.body.comment);
            return comment ? res.send(comment) : res.status(404).send({message: 'Comment not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
             const removed = await commentService.remove(req.params.id);
             return removed ? res.send() : res.status(404).send({message: 'Comment not found'});
        }
        catch(err){
            next(err);
        }
    }
}

export default CommentController;