import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from './pages/login.jsx';
import './index.css'
import App from './App.jsx'
import { SignUp } from './pages/signUp.jsx';
import { UserProvider } from './components/context/usersProvider.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { DashMenu } from './components/dash-menu.jsx';
import { Chat } from './components/chat.jsx';
import { MakePost } from './pages/addPost.jsx';
import { SinglePost } from './pages/singlePost.jsx';
import { Friends } from './pages/friends.jsx';
import { Myprofile } from './pages/profile.jsx';
import { UserProfile } from './pages/usersProfile.jsx';
import { EditProfile } from './pages/editProfile.jsx';
import { ChatPage } from './pages/chatPage.jsx';
import { EditPostPage } from './pages/editPost.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<DashMenu />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/add_post" element={<MakePost />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/post/add_comment/:postId" element={<SinglePost />} />
      <Route path="/edit_post/:id" element={<EditPostPage />} />
      <Route path="/my_profile" element={<Myprofile />} />
      <Route path="/:username" element={<UserProfile />} />
      <Route path="/edit_profile" element={<EditProfile />} />
      <Route path="/dm/:id" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>  
  </UserProvider>
  </StrictMode>
  
)
