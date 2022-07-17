import {NextFunction, Request, Response} from 'express'
import {Comment, IComment} from '../models';

class CommentController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Comment.find({article: req.params.id}));
        }
        catch(err){
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = await Comment.findOne({ article: req.params.id, _id: req.params.commentId});
            return comment ? res.send(comment) : res.status(404).send({message: 'Comment not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try{
            const comment = req.body.comment as IComment;
            comment.article = req.params.id;

            const created = await Comment.create(comment);
            res.send(created);
        }
        catch(err){
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = await Comment.findOneAndUpdate({ article: req.params.id, _id: req.params.commentId}, req.body.comment, {new: true});
            return comment ? res.send(comment) : res.status(404).send({message: 'Comment not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
             const removed = await Comment.findOneAndRemove({ article: req.params.id, _id: req.params.commentId});
             return removed ? res.send() : res.status(404).send({message: 'Comment not found'});
        }
        catch(err){
            next(err);
        }
    }
}

export default CommentController;