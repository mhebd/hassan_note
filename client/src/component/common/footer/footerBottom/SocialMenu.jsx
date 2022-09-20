import React from 'react';
import { useSetting } from '../../../../context/setting/SettingProvider';
import SocialLink from '../../../reusable/SocialLink';

function SocialMenu() {
  const { setting } = useSetting();
  return (
    <div className="col-md-6 order-1 order-md-2">
      <div className="social-menu pt-3">
        <ul className="nav justify-content-center justify-content-md-end">
          {setting &&
            setting?.socialMenu.length > 0 &&
            setting?.socialMenu.map((item) => (
              <SocialLink key={Math.random()} link={item?.link}>
                <i className={`fab fa-${item?.icon}`} />
              </SocialLink>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SocialMenu;
