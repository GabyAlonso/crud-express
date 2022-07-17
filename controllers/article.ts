import {NextFunction, Request, Response} from 'express'
import {Article} from '../models';

class ArticleController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Article.find());
        }
        catch(err){
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await Article.findById(req.params.id);
            return article ? res.send(article) : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Article.create(req.body.article));
        }
        catch(err){
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body.article, {new: true});
            return updatedArticle ? res.send(updatedArticle) : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const removed = await Article.findByIdAndRemove(req.params.id);
            return removed ? res.send() : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }
}

export default ArticleController;
