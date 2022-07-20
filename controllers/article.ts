import {NextFunction, Request, Response} from 'express'
import {ArticleService} from "../services";

const articleService = new ArticleService();

class ArticleController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await articleService.fetch());
        }
        catch(err){
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await articleService.find(req.params.id);
            return article ? res.send(article) : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(201).send(await articleService.create(req.body.article));
        }
        catch(err){
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedArticle = await articleService.update(req.params.id, req.body.article);
            return updatedArticle ? res.send(updatedArticle) : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const removed = await articleService.remove(req.params.id);
            return removed ? res.send() : res.status(404).send({message: 'Article not found'});
        }
        catch(err){
            next(err);
        }
    }
}

export default ArticleController;
