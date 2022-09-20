/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSetting } from '../../../../context/setting/SettingProvider';
import Button from '../../../reusable/Button';
import Input from '../../../reusable/Input';

function SettingForm() {
  const [siteName, setSiteName] = useState('');
  const [quote, setQuote] = useState({
    text: '',
    writer: '',
  });
  // const [topMenu, setTopMenu] = useState([]);
  const [socialMenu, setSocialMenu] = useState([]);

  const [social, setSocial] = useState({
    socialSiteName: '',
    socialSiteIcon: '',
    socialSiteLink: '',
  });

  const { socialSiteLink, socialSiteIcon, socialSiteName } = social;

  const { setting, createSetting } = useSetting();
  console.log(setting);

  useEffect(() => {
    if (setting) {
      setSiteName(setting?.siteName);
      setQuote(setting?.quote);
      // setTopMenu(setting?.topMenu);
      setSocialMenu(setting?.socialMenu);
    }
  }, [setting]);

  const quoteChangeHdl = (e) => setQuote({ ...quote, [e.target.name]: e.target.value });
  const socialFormChange = (e) => setSocial({ ...social, [e.target.name]: e.target.value });

  const submitHdl = (e) => {
    e.preventDefault();
    if (!siteName) {
      console.log('Site name is required');
    } else {
      createSetting({
        siteName,
        quote,
      });
    }
  };

  const addSocial = () => {
    if (!socialSiteName || !socialSiteIcon || !socialSiteLink) {
      console.log('Social form all information is required');
    } else {
      createSetting({
        siteName,
        socialMenu: [
          ...socialMenu,
          {
            name: socialSiteName,
            icon: socialSiteIcon,
            link: socialSiteLink,
          },
        ],
      });
    }
  };

  const deleteSocial = async (id) => {
    const newSocialMenu = [];
    await socialMenu.map((item) => {
      if (item._id !== id) {
        newSocialMenu.push(item);
      }
      return null;
    });
    createSetting({ siteName, socialMenu: newSocialMenu });
  };

  return (
    <form onSubmit={submitHdl} className="form setting-form">
      <div className="mb-5">
        <h5 className="text-muted">Website Name:</h5>
        <Input
          type="text"
          name="siteName"
          placeholder="Site Name..."
          boxClass="form-floating"
          label="Site Name..."
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <h5 className="text-muted">Footer Quote:</h5>
        <div className="mb-4 form-floating">
          <textarea
            name="text"
            value={quote.text}
            onChange={quoteChangeHdl}
            className="form-control"
            placeholder="quote text"
            style={{ height: '100px' }}
          />
          <label htmlFor="text">Quote text...</label>
        </div>

        <Input
          type="text"
          name="writer"
          placeholder="quote writer..."
          boxClass="form-floating"
          label="Quote Writer Name..."
          value={quote.writer}
          onChange={quoteChangeHdl}
        />
      </div>

      <div className="row mb-5">
        <h5 className="text-muted">Add Social Menu:</h5>
        <div className="social-menu-list my-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Site Name</th>
                <th>Site Icon</th>
                <th>Site Link</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {socialMenu &&
                socialMenu.map((item, i) => (
                  <tr key={Math.random()}>
                    <td>{i + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.icon}</td>
                    <td>{item?.link}</td>
                    {/* <td>
                      <button type="button" className="btn-success btn">
                        Edit
                      </button>
                    </td> */}
                    <td>
                      <button
                        onClick={() => deleteSocial(item?._id)}
                        type="button"
                        className="btn-danger btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="socialSiteName">Social site name</label>
          <input
            type="text"
            name="socialSiteName"
            className="form-control"
            value={socialSiteName}
            onChange={socialFormChange}
            placeholder="Social Site Name"
          />
        </div>

        <div className="col-md-3 mb-3">
          <label htmlFor="socialSiteIcon">Social site icon</label>
          <input
            type="text"
            name="socialSiteIcon"
            className="form-control"
            value={socialSiteIcon}
            onChange={socialFormChange}
            placeholder="Social Site Icon"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="socialSiteLink">Social site link</label>
          <input
            type="text"
            name="socialSiteLink"
            className="form-control"
            value={socialSiteLink}
            onChange={socialFormChange}
            placeholder="Social Site Link"
          />
        </div>

        <div className="col-md-2 mb-3 pt-4 d-grid">
          <button onClick={addSocial} className="btn btn-dark" type="button">
            Add
          </button>
        </div>
      </div>

      <Button type="submit" className="btn btn-primary">
        Save Changes
      </Button>
    </form>
  );
}

export default SettingForm;
