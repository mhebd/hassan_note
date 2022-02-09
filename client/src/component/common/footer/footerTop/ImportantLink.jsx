import React, { useEffect, useState } from 'react';
import { usePage } from '../../../../context/page/PageProvider';
import FooterNavLink from '../../../reusable/FooterNavLink';

function ImportantLink() {
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
    <div className="imp-links">
      <ul className="list-unstyled">
        {!isLoading &&
          pageList &&
          pageList.length > 0 &&
          pageList.map(
            (page) =>
              page.inFooterMenu && (
                <FooterNavLink key={Math.random()} link={`/page/${page?.slug}`}>
                  {page?.title}
                </FooterNavLink>
              )
          )}
      </ul>
    </div>
  );
}

export default ImportantLink;
