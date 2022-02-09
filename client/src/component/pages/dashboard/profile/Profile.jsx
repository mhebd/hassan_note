import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../context/user/UserProvider';
import SectionHeading from '../../../reusable/SectionHeading';
import ProfileDetails from './ProfileDetails';
import UpdateProfileForm from './UpdateProfileForm';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { loadUser, updateUser, user, isLoading } = useUser();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <SectionHeading heading="User Profile" />
          {!isLoading && userData && <ProfileDetails user={userData} />}

          <div className="text-center mb-5">
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="btn btn-outline-dark"
            >
              Edit Profile
            </button>
          </div>

          {showForm && <UpdateProfileForm updateUser={updateUser} user={user} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
