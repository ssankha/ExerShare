import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import LognInPage from './routes/log-in-page';
import RegistrationPage from './routes/registration-page';
import reportWebVitals from './reportWebVitals';
import HomePage from './routes/home-page';
import CreatePostPage from './routes/create-post-page';
import GroupsPage from './routes/groups-page';
import CreateGroupPage from './routes/create-group-page';
import JoinGroupPage from './routes/join-group-page';
import ProfilePage from './routes/profile-page';
import GroupPostsPage from './routes/group-posts-page';

let userEmail = "";
let userId;

function setUserEmail(newEmail){
  userEmail = newEmail;
}

function setUserId(newId){
  userId = newId;
}

const router = createBrowserRouter([
  {  
    path: "/",
    element: <LognInPage />,
  },
  {
    path:"/main",
    element: <HomePage/>
  },
  {  
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/create_post",
    element: <CreatePostPage />,
  },
  {
    path:"/groups",
    element: <GroupsPage />
  },
  {
    path:"/create_group",
    element: <CreateGroupPage/>
  },
  {
    path: "/join_group",
    element: <JoinGroupPage/>
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/groups/:groupId/:groupName",
    element: <GroupPostsPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export {userEmail, setUserEmail, userId, setUserId};

