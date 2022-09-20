/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategory } from '../../../../context/category/CategoryProvider';
import SectionHeading from '../../../reusable/SectionHeading';

function CategoryList() {
  const [cats, setCats] = useState(null);

  const { categories, getCategories, isLoading } = useCategory();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories) setCats(categories);
  }, [categories]);

  return (
    <nav className="category-nav">
      <SectionHeading heading="ক্যাটেগরি সমূহ" />
      <ul className="list-unstyled">
        {!isLoading &&
          cats &&
          cats.length > 0 &&
          cats.map((cat) => (
            <li key={Math.random()} className="list-item">
              <Link to={`/category/${cat._id}`} className="nav-link text-reset">
                {cat.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
