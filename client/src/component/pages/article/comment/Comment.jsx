import React, { useEffect, useState } from 'react';
import { useComment } from '../../../../context/comment/ComentProvider';
import { useUser } from '../../../../context/user/UserProvider';
import e2bNumConv from '../../../../util/e2bNumConv';
import Button from '../../../reusable/Button';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';

function Comment({ articleId }) {
  const [comments, setComments] = useState(null);

  const { getRootComments, rootComments, isLoading } = useComment();

  const { user } = useUser();

  useEffect(() => {
    getRootComments(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  useEffect(() => {
    if (rootComments) setComments(rootComments);
  }, [rootComments]);

  return (
    <>
      {!isLoading && comments !== null && (
        <p className="mb-3">মন্তব্য করেছেন {e2bNumConv(comments.length) || '০'} জন</p>
      )}

      {!user && (
        <Button className="btn-primary mb-4" data-bs-toggle="offcanvas" data-bs-target="#drower">
          মন্তব্য প্রকাশের জন্য লগইন করুন
        </Button>
      )}

      {!isLoading &&
        comments !== null &&
        comments.map((comment) => <SingleComment comment={comment} key={Math.random()} />)}

      {user && <CommentForm articleId={articleId} />}
    </>
  );
}

export default Comment;
