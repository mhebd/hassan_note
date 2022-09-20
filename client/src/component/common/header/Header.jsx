import React, { useEffect, useState } from 'react';
import { useSetting } from '../../../context/setting/SettingProvider';
import { useUser } from '../../../context/user/UserProvider';
import Notification from '../../reusable/Notification';
import Drawer from './drawer/Drawer';
import Navbar from './navbar/Navbar';

function Header() {
  const [userInfo, setUserInfo] = useState(null);
  // const [settingData, setSettingData] = useState(null);

  const { user, logoutUser, loadUser, isLoding, message } = useUser();

  const { getSetting, setting } = useSetting();

  useEffect(() => {
    loadUser();
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) setUserInfo(user);
  }, [user]);

  // useEffect(() => {
  //   if (setting) setSettingData(setting);
  // }, [setting]);

  return (
    <header>
      <Navbar setting={setting} />

      <Drawer user={userInfo} logoutUser={logoutUser} isLoding={isLoding} />

      <Notification message={message} />
    </header>
  );
}

export default Header;
