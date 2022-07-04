import {Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article, Comment} from '../models';
import {Articles, Comments} from "../data";

const {ObjectId} = Types;

class CommentController {
    static fetch(req: Request, res: Response) {
        res.send(Comments.filter(c => c.articleid === req.params.id));
    }

    static find(req: Request, res: Response) {
        const article = Comments.find(c => c.articleid === req.params.id && c.id === req.params.commentid);
        res.send(article);
    }

    static create(req: Request, res: Response) {
        const comment = {...req.body.comment as Comment, id: new ObjectId().toString(), articleid: req.params.id};
        Comments.push(comment);
        res.send(comment);
    }

    static update(req: Request, res: Response) {
        const comment = Comments.find(c => c.articleid === req.params.id && c.id === req.params.commentid);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        const updatedComment = {...comment, ...req.body.comment as Partial<Comment>};
        Comments[Comments.indexOf(comment)] = updatedComment;
        res.send(updatedComment);
    }

    static remove(req: Request, res: Response) {
        const comment = Comments.find(c => c.articleid === req.params.id && c.id === req.params.commentid);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        Comments.splice(Comments.indexOf(comment), 1);
        res.end();
    }
}

export default CommentController;