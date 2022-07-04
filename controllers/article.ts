import {Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article} from '../models';
import {Articles} from "../data";

const {ObjectId} = Types;

// const Articles: Article[] = [{
//     id: new ObjectId().toString(),
//     title: 'Article 1',
//     author: 'John Doe',
//     body: 'This is the body of article 1',
// }]

class ArticleController {
    static fetch(req: Request, res: Response) {
        res.send(Articles);
    }

    static find(req: Request, res: Response) {
        const article = Articles.find(article => article.id === req.params.id);
        res.send(article);
    }

    static create(req: Request, res: Response) {
        const article = {...req.body.article as Article, id: new ObjectId().toString()};
        console.log(article);
        Articles.push(article);
        res.send(article);
    }

    static update(req: Request, res: Response) {
        const article = Articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        const updatedArticle = {...article, ...req.body.article as Partial<Article>};
        Articles[Articles.indexOf(article)] = updatedArticle;
        res.send(updatedArticle);
    }

    static remove(req: Request, res: Response) {
        const article = Articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        Articles.splice(Articles.indexOf(article), 1);
        res.end();
    }
}

export default ArticleController;
