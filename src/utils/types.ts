export interface Post {
    id: string
    caption: string;
    imageUrl: string;
    likes: number;
}
export interface CreatePostType {
    caption: string;
    imageUrl: string;
    likes: number;
}