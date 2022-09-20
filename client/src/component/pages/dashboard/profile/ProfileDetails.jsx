import React from 'react';

function ProfileDetails({ user }) {
  return (
    <div className="user-details text-center mb-5">
      <img src={user?.gravatar} alt="" className="img-fluid mb-3" />
      <h3 className="user-name">{user?.name}</h3>
      <p className="">{user?.email}</p>
      <p className="details">
        <em>{user?.biodata}</em>
      </p>
    </div>
  );
}

export default ProfileDetails;
