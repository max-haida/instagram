import React, { useState } from 'react';
import './Homepage.css';

const HomePage = () => {
  // Стейт для збереження постів
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'user1',
      imageUrl: '',
      caption: 'Це перший пост! #myfirstpost',
      likes: 150,
      comments: ['Красиво!', 'Чудово виглядає!'],
    },
    // https://media.istockphoto.com/id/517188688/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D1%96%D1%80%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6.jpg?s=612x612&w=0&k=20&c=aYXSnpX9gjqdRBW0vgw-4QIM-YNvdpvofUWE4c2dVGA=
    {
      id: 2,
      username: 'user2',
      imageUrl: 'https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg',
      caption: 'Природа прекрасна! #nature',
      likes: 200,
      comments: ['Неймовірно!', 'Прекрасний пейзаж!'],
    },
  ]);

  return (
    <div className="home-page">
      <div className="navbar">
        <div className="logo">Stogram</div>
        <div className="navbar-links">
          <button className="nav-btn">Пошук</button>
          <button className="nav-btn">Повідомлення</button>
          <button className="nav-btn">Профіль</button>
        </div>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <span className="username">{post.username}</span>
            </div>
            <img className="post-image" src={post.imageUrl} alt="Post" />
            <div className="post-actions">
              <button className="like-btn">Лайк {post.likes}</button>
            </div>
            <div className="post-caption">
              <span>{post.caption}</span>
            </div>
            <div className="post-comments">
              {post.comments.map((comment, index) => (
                <p key={index} className="comment">
                  {comment}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
