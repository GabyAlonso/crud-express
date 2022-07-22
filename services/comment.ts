import {Comment, IComment} from "../models";

class CommentService {
    fetch(article: any) {
        return Comment.find({article: article}).lean().exec();
    }

    create(comment: IComment) {
        return Comment.create(comment);
    }

    update(id: any, comment: IComment) {
        return Comment.findByIdAndUpdate(id, comment, {new: true}).lean().exec();
    }

    async remove(id: any){
        return Comment.findByIdAndRemove(id);
    }
}

export default CommentService;
