export type BlogPost = {
    id?: string;
    post: string;
    author: {
        id?: string;
        username: string;
        email: string;
    };
    topic: string;
    created_at?: string;
}