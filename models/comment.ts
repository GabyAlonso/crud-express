class Comment {
    id: string;
    title: string;
    body: string;
    author: string;
    articleId: string

    constructor(id: string, title: string, body: string, author: string, articleId: string) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
        this.articleId = articleId;
    }
}

export default Comment;
