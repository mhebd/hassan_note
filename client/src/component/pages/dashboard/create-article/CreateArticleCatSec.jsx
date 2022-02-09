/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useCategory } from '../../../../context/category/CategoryProvider';
import Notification from '../../../reusable/Notification';

function CreateArticleCatSec({ onChangeHdl, checked }) {
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState(null);

  const { getCategories, createCategory, deleteCategory, categories, message } = useCategory();

  const submitCat = () => {
    if (!cat || cat.length < 3) {
      console.log('Enter a category name first');
    } else {
      createCategory({ name: cat });
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories) setCats(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      <div className="mb-3 input-group">
        <input
          type="text"
          name="newCat"
          className="form-control"
          value={cat}
          placeholder="Add new category"
          onChange={(e) => setCat(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={submitCat} type="button">
          Add
        </button>
      </div>

      <p>Select a category</p>
      <div className="mb-3 form-check">
        <ul className="list-unstyled">
          {cats &&
            cats.length > 0 &&
            cats.map((cate) => (
              <li key={Math.random()} className="list-item mb-2 d-flex justify-content-between">
                <div className="">
                  <input
                    type="radio"
                    name="category"
                    className="form-check-input"
                    value={cate._id}
                    onChange={onChangeHdl}
                    checked={cate._id === checked}
                  />
                  <label htmlFor="" className="form-check-label">
                    {cate.name}
                  </label>
                </div>
                <div className="btns">
                  <button type="button" className="btn btn-success me-1">
                    <i className="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCategory(cate._id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <Notification message={message} />
    </>
  );
}

export default CreateArticleCatSec;
