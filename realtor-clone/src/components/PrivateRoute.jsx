import React from 'react'
import { getAuth } from 'firebase/auth'
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const auth = getAuth();
    const user = auth.currentUser;
  return user? <Outlet/>:<Navigate to="/sign-in" />
}
