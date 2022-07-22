import {Article, Comment, IComment} from "../../models";
import {CommentService} from "../../services";
const testDb = require('../testDb');

describe("CommentService", () => {
    beforeAll(async () => {
        await testDb.connect();
    });

    afterEach(async () => {
        await testDb.reset();
    });

    afterAll(async () => {
        await testDb.disconnect();
    });

    const commentService = new CommentService();

    describe('fetch', () => {
        test('should return empty array if no comments are present', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comments = await commentService.fetch(article._id);

            expect(comments).toHaveLength(0);
        });

        test('should return comments', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comment1 = await Comment.create({
                title: 'Comment 1',
                author: 'User 1',
                body: 'Comment 1 text',
                article: article._id
            });

            const comment2 = await Comment.create({
                title: 'Comment 2',
                author: 'User 2',
                body: 'Comment 2 text',
                article: article._id
            });

            const comments = await commentService.fetch(article._id);

            expect(comments[0].title).toBe(comment1.title);
            expect(comments[1].title).toBe(comment2.title);
        });
    });

    describe('create', () => {
        test('should create comment', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comment1 = {
                title: 'Comment 1',
                author: 'User 1',
                body: 'Comment 1 text',
                article: article._id
            };

            const newComment = await commentService.create(comment1 as IComment);

            expect(newComment).not.toBeNull();
            expect(newComment?.title).toBe(comment1.title);
        });
    });

    describe('update', () => {
        test('should update comment', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comment1 = await Comment.create({
                title: 'Comment 1',
                author: 'User 1',
                body: 'Comment 1 text',
                article: article._id
            });

            const modified = await commentService.update(comment1._id, { title: 'A New Title' } as IComment);

            expect(modified?.title).toBe('A New Title');
        });

        test('should not update comment with null values', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comment1 = await Comment.create({
                title: 'Comment 1',
                author: 'User 1',
                body: 'Comment 1 text',
                article: article._id
            });

            try {
                await commentService.update(comment1._id, { } as IComment);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('remove', () => {
        test('should remove comment', async () => {
            const article = await Article.create({
                title: 'Test',
                author: 'Me',
                body: 'Some stuff'
            });

            const comment1 = await Comment.create({
                title: 'Comment 1',
                author: 'User 1',
                body: 'Comment 1 text',
                article: article._id
            });

            await commentService.remove(comment1._id);

            const removed = await Comment.findById(comment1._id);
            expect(removed).toBeNull();
        });
    });

});
