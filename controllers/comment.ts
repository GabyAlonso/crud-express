import {Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article, Comment} from '../models';
import {articles, comments} from "../data";

const {ObjectId} = Types;

class CommentController {
    static fetch(req: Request, res: Response) {
        res.send(comments.filter(c => c.articleId === req.params.id));
    }

    static find(req: Request, res: Response) {
        const article = comments.find(c => c.articleId === req.params.id && c.id === req.params.commentId);
        res.send(article);
    }

    static create(req: Request, res: Response) {
        const comment = {...req.body.comment as Comment, id: new ObjectId().toString(), articleId: req.params.id};
        comments.push(comment);
        res.send(comment);
    }

    static update(req: Request, res: Response) {
        const comment = comments.find(c => c.articleId === req.params.id && c.id === req.params.commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        const updatedComment = {...comment, ...req.body.comment as Partial<Comment>};
        comments[comments.indexOf(comment)] = updatedComment;
        res.send(updatedComment);
    }

    static remove(req: Request, res: Response) {
        const comment = comments.find(c => c.articleId === req.params.id && c.id === req.params.commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        comments.splice(comments.indexOf(comment), 1);
        res.end();
    }
}

export default CommentController;