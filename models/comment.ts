import mongoose, {Schema, Types} from "mongoose";

interface IComment {
    title: string,
    author: string,
    body: string,
    article: Types.ObjectId
};

const Comment = mongoose.model('Comment', new Schema<IComment>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
    article: { type: Schema.Types.ObjectId, ref: 'Article' }
}));

export {Comment, IComment};
