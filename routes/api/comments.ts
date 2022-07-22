import {Router} from 'express';
import CommentController from "../../controllers/comment";

const commentsApi = (router: Router) => {
    router.get('/:article', CommentController.fetch);
    router.post('/', CommentController.create);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
};

export default commentsApi;
