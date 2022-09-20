/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Button from '../../../reusable/Button';
import CommentForm from './CommentForm';
import ReplyComment from './ReplyComment';

function SingleComment({ comment }) {
  const { user, content, _id, article } = comment;
  const [formShow, setFormShow] = useState(false);

  const formToggle = () => setFormShow(!formShow);

  return (
    <div className="single-comment mb-4">
      <div className="d-flex juntify-content-start border p-2">
        <div className="me-3">
          <img
            src={user?.gravatar}
            alt={user?.name}
            className="img-thumbnail rounded-circle"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
        <div className="w-100">
          <h4 className="text-muted">{user?.name}</h4>

          <p className="">{content}</p>

          <Button className="" onClick={formToggle}>
            <u className="fw-bold mark text-muted">reply</u>
          </Button>

          {formShow && <CommentForm articleId={article} responseId={_id} />}
        </div>
      </div>

      <div className="reply-comment ms-5">
        <ReplyComment responseId={_id} />
      </div>
    </div>
  );
}

export default SingleComment;
