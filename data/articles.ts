import {Types} from 'mongoose'
import {Article, Comment} from '../models';
const {ObjectId} = Types;

const articles: Article[] = [{
    id: new ObjectId().toString(),
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1',
}]

export default articles;