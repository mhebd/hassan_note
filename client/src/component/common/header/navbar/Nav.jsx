import React, { useEffect, useState } from 'react';
import { usePage } from '../../../../context/page/PageProvider';
import Navlink from '../../../reusable/Navlink';

function Nav() {
  const [pageList, setPageList] = useState(null);

  const { getPages, pages, isLoading } = usePage();

  useEffect(() => {
    getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pages) setPageList(pages);
  }, [pages]);

  return (
    <div className="collapse navbar-collapse order-3 order-md-1" id="topMenu">
      <ul className="navbar-nav mx-auto">
        <Navlink link="/">নীড় পাতা</Navlink>
        {!isLoading &&
          pageList.length > 0 &&
          pageList.map(
            (page) =>
              page.inTopMenu && (
                <Navlink key={Math.random()} link={`/page/${page?.slug}`}>
                  {page?.title}
                </Navlink>
              )
          )}
      </ul>
    </div>
  );
}

export default Nav;
