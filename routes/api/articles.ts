import {Router} from 'express';
import {ArticleController} from '../../controllers';
import CommentController from "../../controllers/comment";

const articlesApi = (router: Router) => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.find);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);

    router.get('/:id/comments', CommentController.fetch);
    router.get('/:id/comments/:commentid', CommentController.find);
    router.post('/:id/comments', CommentController.create);
    router.put('/:id/comments/:commentid', CommentController.update);
    router.delete('/:id/comments/:commentid', CommentController.remove);

    return router;
};

export default articlesApi;
