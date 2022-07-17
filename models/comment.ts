import mongoose, {Schema} from "mongoose";

interface IComment {
    title: string,
    author: string,
    body: string,
    article: any
}
const Comment = mongoose.model('Comment', new Schema<IComment>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
    article: { type: Schema.Types.ObjectId, ref: 'Article' }
}))

export {Comment, IComment};
