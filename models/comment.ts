class Comment {
    id: string;
    title: string;
    body: string;
    author: string;
    articleid: string

    constructor(id: string, title: string, body: string, author: string, articleid: string) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
        this.articleid = articleid;
    }
}

export default Comment;
