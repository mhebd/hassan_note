import React from 'react';
import SectionHeading from '../../../reusable/SectionHeading';
import SettingForm from './SettingForm';

function Setting() {
  return (
    <div className="container setting">
      <SectionHeading heading="Change Site Setting" />

      <SettingForm />
    </div>
  );
}

export default Setting;
