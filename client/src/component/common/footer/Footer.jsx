import React from 'react';
import { useSetting } from '../../../context/setting/SettingProvider';
import SectionHeading from '../../reusable/SectionHeading';
import CopyWrite from './footerBottom/CopyWrite';
import SocialMenu from './footerBottom/SocialMenu';
import ImportantLink from './footerTop/ImportantLink';
import NewsLater from './footerTop/NewsLater';
import Quote from './footerTop/Quote';

function Footer() {
  const { setting } = useSetting();
  return (
    <footer>
      <div className="footer-top bg-dark py-5 pb-3 text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3 order-2 order-md-1">
              <SectionHeading heading="প্রয়োজনীয় লিঙ্ক" />
              <ImportantLink />
            </div>

            <div className="col-md-6 mb-3 order-1 order-md-2">
              <SectionHeading heading="মনীষীদের বার্তা" />
              <Quote setting={setting} />
            </div>

            <div className="col-md-3 col-sm-6 order-3">
              <SectionHeading heading="নতুনত্বের খবর" />
              <NewsLater />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-dark bordered border-top border-primary text-light pb-2">
        <div className="container">
          <div className="row">
            <CopyWrite setting={setting} />
            <SocialMenu />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
