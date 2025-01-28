import React, { useState, useEffect } from 'react';
import './Homepage.css'; // Імпортуємо CSS файл

const initialPosts = [
  {
    id: 1,
    username: 'user1',
    imageUrl: 'https://slovoproslovo.info/wp-content/uploads/2021/04/ukraine_mountains_499280.jpg',
    caption: 'Hello World!',
    likes: 10,
    likedByUser: false,
    comments: [
      { username: 'user2', comment: 'Nice pic!' },
      { username: 'user3', comment: 'Love it!' }
    ],
    isFavorite: false
  },
  {
    id: 2,
    username: 'user2',
    imageUrl: 'https://media.istockphoto.com/id/517188688/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D0%BD%D1%8B%D0%B9-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82.jpg?s=612x612&w=0&k=20&c=6Qfb5YCLIkiq_hYxRmTj8t2FWwr4Yrdq2CRGVwj5Ymk=',
    caption: 'Amazing view!',
    likes: 5,
    likedByUser: false,
    comments: [
      { username: 'user1', comment: 'Stunning!' }
    ],
    isFavorite: false
  }
];

function App() {
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('email'); // Можна змінити на поточного користувача

  // Завантажуємо пости з localStorage або використовуємо початкові
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);
    } else {
      localStorage.setItem('posts', JSON.stringify(initialPosts));
      setPosts(initialPosts);
    }
  }, []);

  // Функція для додавання коментаря
  const handleComment = (postId, newComment) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { username: currentUser, comment: newComment }] }
        : post
    );
    
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Функція для видалення коментаря
  const handleDeleteComment = (postId, commentIndex) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
        : post
    );
    
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Функція для лайку поста
  const handleLike = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1
          }
        : post
    );

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="App">
      <div className="container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <span className="username">{post.username}</span>
              <button className="favorite-btn">
                {post.isFavorite ? '⭐' : '☆'}
              </button>
            </div>
            <img className="post-image" src={post.imageUrl} alt="Post" />
            <div className="post-actions">
              <button
                className="like-btn"
                onClick={() => handleLike(post.id)}
              >
                {post.likedByUser ? '❤️' : '💔'} {post.likes}
              </button>
            </div>
            <div className="post-caption">
              <strong>{post.username}: </strong>{post.caption}
            </div>
            <div className="comments">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.username}</strong>: {comment.comment}
                  {/* Показуємо кнопку видалення тільки для коментарів поточного користувача */}
                  {comment.username === currentUser && (
                    <button 
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(post.id, index)}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="comment-input">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const newComment = e.target.value;
                    if (newComment) {
                      handleComment(post.id, newComment);
                    }
                    e.target.value = '';
                  }
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
