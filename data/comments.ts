import articles from "./articles";
import {Types} from 'mongoose'
import {Comment} from '../models';
const {ObjectId} = Types;

const comments: Comment[] = [{
    id: new ObjectId().toString(),
    title: 'Comment Article 1',
    author: 'Cosme Fulanito',
    body: 'A comment for article 1',
    articleid: articles[0].id
}]

export default comments;