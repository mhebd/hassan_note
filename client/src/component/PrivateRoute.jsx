/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../context/user/UserProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { loading, user } = useUser();
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading && user?.type !== 'admin' ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;
