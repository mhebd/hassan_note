/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePage } from '../../../../context/page/PageProvider';
import Notification from '../../../reusable/Notification';
import SectionHeading from '../../../reusable/SectionHeading';

function Pages() {
  const [pageList, setPageList] = useState(null);

  const { getPages, deletePage, pages, isLoading, message } = usePage();

  useEffect(() => {
    getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pages) setPageList(pages);
  }, [pages]);

  return (
    <div className="container dashboard">
      <div className="d-flex justify-content-between align-items-start">
        <SectionHeading heading="পেজ সমূহ" />
        <Link to="/dashboard/create-page" className="btn btn-primary">
          Add Page
        </Link>
      </div>

      <div className="page-list">
        <table className="table table-striped w-100 table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              pageList &&
              pageList.length > 0 &&
              pageList.map((page, i) => (
                <tr key={Math.random()}>
                  <th>{i + 1}</th>
                  <td>
                    <Link to={`/page/${page?.slug}`} className="text-reset">
                      {page?.title}
                    </Link>
                  </td>
                  <td>
                    {new Date(page?.created).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/create-page?slug=${page?.slug}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletePage(page?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Notification message={message} />
    </div>
  );
}

export default Pages;
