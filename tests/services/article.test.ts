import {Article, IArticle, Comment} from "../../models";
import {ArticleService} from "../../services";
const testDb = require('../testDb');

describe("ArticleService", () => {
    beforeAll(async () => {
        await testDb.connect();
    });

    afterEach(async () => {
        await testDb.reset();
    });

    afterAll(async () => {
        await testDb.disconnect();
    });

    const articleService = new ArticleService();

    describe('fetch', () => {
        test('should return empty array', async () => {
            const articles = await articleService.fetch();

            expect(articles).toHaveLength(0);
        });

        test('should return articles', async () => {
            const sharksArticle = await Article.create({  title: "Sharks",
                author: "not-a-shark",
                body: "An article about Sharks"});

            const catsArticle = await Article.create({  title: "Cats",
                author: "catlady32",
                body: "An article about Cats"});

            const articles = await articleService.fetch();

            expect(articles[0].title).toBe(sharksArticle.title);
            expect(articles[1].title).toBe(catsArticle.title);
        });
    });

    describe('find', () => {
        test('should return null', async () => {
            const article = await articleService.find("62d4842f0fc512457d632a0e");

            expect(article).toBeNull();
        });

        test('should return article', async () => {
            const newArticle = await Article.create({  title: "New",
                author: "admin",
                body: "An article"});

            const article = await articleService.find(newArticle._id);

            expect(article).toBeDefined();
            expect(article?.title).toBe(newArticle.title);
        });
    });

    describe('create', () => {
        test('should create article', async () => {
            const article = { title: 'Dogs', author: 'Willy', body: 'An article about Dogs' } ;

            const newArticle = await articleService.create(article);

            expect(newArticle).not.toBeNull();
            expect(newArticle?.title).toBe(article.title);
        });

        test('should not create article if author is null', async () => {
            const article = { title: 'Dogs', body: 'An article about Dogs' } as IArticle ;

            try {
                await articleService.create(article);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('update', () => {
        test('should update article', async () => {
            const newArticle = await Article.create({
                title: "New",
                author: "admin",
                body: "An article"
            });

            const modified = await articleService.update(newArticle._id, { title: 'A New Title' } as IArticle);

            expect(modified?.title).toBe('A New Title');
        });

        test('should not update article with null values', async () => {
            const newArticle = await Article.create({
                title: "New",
                author: "admin",
                body: "An article"
            });

            try {
                await articleService.update(newArticle._id, { } as IArticle);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('remove', () => {
        test('should remove article', async () => {
            const newArticle = await Article.create({
                title: "To Delete",
                author: "admin",
                body: "An article"
            });

            await articleService.remove(newArticle._id);

            const removed = await Article.findById(newArticle._id);
            expect(removed).toBeNull();
        });

        test('should remove comments when parent article is removed', async () => {
            const newArticle = await Article.create({
                title: "To Delete",
                author: "admin",
                body: "An article"
            });

            const comment = await Comment.create({
                title: "Comment to Delete",
                author: "somebody",
                body: "A comment that should be deleted",
                article: newArticle._id
            });

            await articleService.remove(newArticle._id);

            const removedComment = await Comment.findById(comment._id);

            expect(removedComment).toBeNull();
        });
    });

});
