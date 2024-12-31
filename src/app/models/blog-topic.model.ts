import { BlogPost } from "./blog-post.model";

export type BlogTopic = {
    id?: string;
    title: string;
    author: string;
    posts?: BlogPost[];
}