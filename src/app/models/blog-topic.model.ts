import { BlogPost } from "./blog-post.model";

export type BlogTopic = {
    id?: string;
    title: string;
    author: {
        id?: string;
        username: string;
        email: string;
    };
    posts?: BlogPost[];
}