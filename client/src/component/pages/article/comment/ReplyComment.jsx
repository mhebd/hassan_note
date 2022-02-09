/* eslint-disable import/no-cycle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment({ responseId }) {
  const [replies, setReplies] = useState(null);

  useEffect(() => {
    const getResponseComments = async (rid) => {
      try {
        const res = await axios(`/api/v1/comment/response/${rid}`, {
          headers: { 'content-type': 'application/json' },
        });

        setReplies(res.data.resComments);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getResponseComments(responseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseId]);

  return (
    replies?.length > 0 &&
    replies.map((comment) => (
      <div className="reply-wrap mt-3" key={Math.random()}>
        <SingleComment comment={comment} />
      </div>
    ))
  );
}

export default ReplyComment;
