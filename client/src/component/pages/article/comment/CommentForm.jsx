/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useComment } from '../../../../context/comment/ComentProvider';
import SectionHeading from '../../../reusable/SectionHeading';

function CommentForm({ articleId, responseId }) {
  const [content, setContent] = useState('');

  const onChange = (e) => setContent(e.target.value);

  const { createComment } = useComment();

  const submitHdl = (e) => {
    e.preventDefault();
    if (!content) {
      console.log('please enter your comment');
    } else {
      createComment({
        content,
        article: articleId,
        responseTo: responseId,
      });
      setContent('');
    }
  };
  return (
    <form className="comment-form mt-5 mb-3" onSubmit={submitHdl}>
      <SectionHeading heading="আপনার মন্তব্য প্রকাশ করুন" />
      <div className="mb-3 form-floating">
        <textarea
          name="comment"
          className="form-control"
          placeholder="আপনার মন্তব্য..."
          id=""
          cols="30"
          rows="10"
          value={content}
          onChange={onChange}
          style={{ height: '120px', resize: 'none' }}
        />
        <label htmlFor="comment">আপনার মন্তব্য...</label>
      </div>
      <button type="submit" className="btn btn-primary">
        মন্তব্য
      </button>
    </form>
  );
}

export default CommentForm;
