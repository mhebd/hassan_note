import React from 'react';
import CategoryList from './CategoryList';
import DashboardMenu from './DashboardMenu';
import LoginForm from './LoginForm';
import SearchForm from './SearchForm';

function Drawer({ user, isLoading, logoutUser }) {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="drower"
      aria-labelledby="offcanvasLabel"
    >
      <div className="offcanvas-header">
        <SearchForm />

        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        {user === null && <LoginForm />}
        {!isLoading && user && (
          <div className="d-flex justify-content-between">
            <h5 className="offcanvas-title" id="offcanvasLabel">
              স্বাগতম, {user.name}
            </h5>
            <button type="button" onClick={() => logoutUser()} className="btn btn-danger">
              <i className="fas fa-sign-out-alt" />
            </button>
          </div>
        )}
        <hr />
        {!isLoading && user?.type === 'admin' && <DashboardMenu />}
        <CategoryList />
      </div>
    </div>
  );
}

export default Drawer;
