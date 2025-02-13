export type User = {
    id?: string;
    username: string;
    email: string;
    imageURL: string;
    posts?: [];
    topics?: [];
    group_names: string[]
}