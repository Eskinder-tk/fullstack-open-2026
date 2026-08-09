import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import LoginForm from "./components/LoginForm";
import CreatBlog from "./components/CreatBlog";
import Notify from "./components/Notify";
import Error from "./components/Error";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import BlogDetail from "./components/BlogDetail";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import useNotificationStore from "./hooks/useNotification";
import { useBlogs } from "./hooks/useBlogs";
import {useLogActions, useCredentials} from './hooks/useLogin'
import {removeUser} from './services/persistentUser'
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";

const App = () => {
  
  const {blogs} = useBlogs()
  const {setNewMessage , setError} = useNotificationStore()
  const {user} = useCredentials()
  const {setUser , initialize} = useLogActions()

  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    initialize()
  }, [initialize]);

  const logUserOut = async () => {
    removeUser()
    setUser(null);
      setNewMessage("successfull logged out");
      setTimeout(() => {
        setNewMessage(null);
      }, 5000);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };
  const logOutStyle = { "&:hover": { bgcolor: "rgba(226, 5, 5, 0.8)" } };
  const loginStyle = { "&:hover": { bgcolor: "rgba(49, 192, 9, 0.8)" } };

  const NotFound = () => {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Looks like you wandered off the map!</p>
        <Link to="/">Go back home</Link>
      </div>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={style}>
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users" sx={style}>
            Users
          </Button>
          <Button color="inherit" component={Link} to="/create" sx={style}>
            New Blog
          </Button>

          {!user && (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={loginStyle}
            >
              Login
            </Button>
          )}

          {user && (
            <Button onClick={logUserOut} color="inherit" sx={logOutStyle}>
              log out
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <ErrorBoundary
        fallback={
          <div>
            <h3>Something went wrong :(</h3>
            <div>please report the problem to easkndrtk@gmail.com</div>
          </div>
        }
      >
        <Error />

        <Notify />

        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail/>}/>

          <Route path="/users/:id" element={<UserDetail/>}/>

          <Route path="/users" element={<Users/>}/>

          <Route path="/create" element={<CreatBlog />} />
          <Route
            path="/"
            element={
              <li>
                <h2>Blogs</h2>
                {sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                ))}
              </li>
            }
          />

          <Route
            path="/login"
            element={
              <LoginForm/>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
