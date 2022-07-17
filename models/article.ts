import mongoose from "mongoose";

interface IArticle {
    title: string,
    author: string,
    body: string
}
const Article = mongoose.model('Article', new mongoose.Schema<IArticle>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
}, {timestamps: true}));

export {Article, IArticle};