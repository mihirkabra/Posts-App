import React, { useEffect, useState } from "react";
import { FaHeart, FaPlus, FaTrash, FaFire } from "react-icons/fa";
import swal from 'sweetalert';
import { createPost, deletePost, getPosts } from "../api/posts";
import type { Post } from "../utils/types";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingIds, setDeletingIds] = useState<string[]>([]);

    const fetchPosts = async () => {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
    };

    const handleDelete = (id: string) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setDeletingIds((prev) => [...prev, id]);

                setTimeout(async () => {
                    await deletePost(id);
                    setPosts((prev) => prev.filter((post) => post.id !== id));
                    setDeletingIds((prev) => prev.filter((delId) => delId !== id));
                }, 1000);
            }
        });
    };

    const createRandomPost = async () => {
        try {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
            setTimeout(async () => {
                const randomLikes = Math.floor(Math.random() * 300) + 1;
                const randomImageUrl = `https://picsum.photos/300/200?rando=${Date.now()}`;

                const newPost = {
                    caption: "Randomly created post",
                    likes: randomLikes,
                    imageUrl: randomImageUrl,
                };

                const data = await createPost(newPost);
                setPosts((prev) => ([...prev, data]));

                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 1000);
            }, 1000);
        } catch (e) {
            console.error('Error:', e);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4 heading"><strong>Post Feed</strong>&nbsp;<FaFire className="fire-icon" /></h2>
            {loading ? (
                <div className="text-center">Loading posts...</div>
            ) : posts.length === 0 ? (
                <div className="text-center">No posts found.</div>
            ) : (
                <div className="row g-4">
                    {posts.map((post) => (
                        <div className="col-md-6 col-lg-4" key={post.id}>
                            <div className={`card h-100 shadow-sm position-relative fade-out-card ${deletingIds.includes(post.id) ? "fade-out" : ""}`}>
                                <img
                                    src={post.imageUrl}
                                    className="card-img-top img"
                                    alt={post.caption}
                                    loading="lazy"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{post.caption}</h5>
                                    <p className="card-text mb-2 text-muted">
                                        <FaHeart className="heart-icon" /> {post.likes} Likes
                                    </p>
                                    <button
                                        className="btn btn-sm btn-danger position-absolute d-flex align-items-center justify-content-center delete-button"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <FaTrash className="my-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                className="btn btn-primary shadow position-fixed d-flex align-items-center justify-content-center create-post-button"
                onClick={() => {
                    createRandomPost()
                }}
            >
                <FaPlus />&nbsp;<strong className="mb-1">Create Post</strong>
            </button>
        </div>
    );
};

export default Home;
