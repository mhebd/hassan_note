/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SectionHeading from '../../../reusable/SectionHeading';
import CreatePageForm from './CreatePageForm';

function CreatePage(props) {
  return (
    <div className="container dahsboard">
      <SectionHeading heading="add new post" />

      <CreatePageForm {...props} />
    </div>
  );
}

export default CreatePage;
