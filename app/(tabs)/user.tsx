import React from 'react';
import { useUser } from '../Context/UserContext';
import Profile from '../user/Profile';
import Chat from '../user/chat';

const User = () => {
  const { user } = useUser();
  return user ? <Chat/> : <Profile/>
};

export default User;