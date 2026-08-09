import { useState } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useCredentials } from "../hooks/useLogin";
import { useBlogs } from "../hooks/useBlogs";

const Blog = ({ blog}) => {

  const {user} = useCredentials()
  const {handleLikes : updateBlog} = useBlogs()
  const [show, setShow] = useState(false);

  const verifyUser = blog.user?.username === user?.username ? true : false;

  const showWhenVisible = { display: show ? "" : "none" };

  const showVerified = { display: verifyUser ? "" : "none" };

  const toggleDetail = () => {
    setShow(!show);
  };
  const buttonLabel = show === false ? "view" : "hide";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleBlogUpdate = (event, blog) => {
    event.preventDefault();
    updateBlog(blog.id, {
      title: blog.title,
      user: blog.user.id,
      url: blog.url,
      author: blog.author,
      likes: blog.likes,
      id: blog.id,
    });
  };

  const handleDelete = (event, blog) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  return (
    <div className="titleAuthor">
      <ul>
        <li>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
