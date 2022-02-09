/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from 'react-toastify';
import { useArticle } from '../../../../context/article/ArticleProvider';
import Button from '../../../reusable/Button';
import Input from '../../../reusable/Input';
import Notification from '../../../reusable/Notification';
import CreateArticleCatSec from './CreateArticleCatSec';

function CreateArticleForm({ location }) {
  const { slug } = queryString.parse(location.search);

  // Initial Sate
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    tags: '',
  });

  const [coverImage, setCoverImage] = useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Get provider variable
  const { createArticle, updateArticle, getArticle, article, message } = useArticle();

  // Get State data in variable
  const { title, excerpt, category, tags } = formData;

  // On change handlers
  const onChangeHdl = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  // On submit handler
  const submitArticle = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('title', title);
    data.append('excerpt', excerpt);
    data.append('category', category);
    data.append('tags', tags);
    data.append('coverImage', coverImage);
    data.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent())));

    if (slug) {
      if (!title || !category || !excerpt) {
        toast.warn('All the field is required');
      } else if (draftToHtml(convertToRaw(editorState.getCurrentContent())).length < 15) {
        toast.warn('content must at least 15 charecter long.');
      } else {
        updateArticle(data, formData?._id);
      }
    }

    if (!slug) {
      if (!title || !category || !excerpt || !coverImage) {
        toast.warn('All the field is required');
      } else if (draftToHtml(convertToRaw(editorState.getCurrentContent())).length < 15) {
        toast.warn('content must at least 15 charecter long.');
      } else {
        e.preventDefault();
        createArticle(data);
      }
    }
  };

  // Handle effects
  useEffect(() => {
    if (slug) getArticle(slug || 'hello');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (slug && article)
      setFormData({
        ...article,
        category: article?.category?._id,
        tags: article?.tags.join(', '),
      });

    if (slug && article) {
      const blocksFromHtml = htmlToDraft(article?.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [article, slug]);

  const uploadImageCallBack = (file) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/v1/upload-img');
      xhr.setRequestHeader('x-auth-token', localStorage.token);
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        toast.error(response);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        toast.error(error);
        reject(error);
      });
    });

  return (
    <form onSubmit={(e) => submitArticle(e)} encType="multipart/form-data" className="add-article">
      <div className="row">
        <div className="col-lg-8 mb-3">
          <Input
            type="text"
            className="form-control"
            name="title"
            placeholder="title"
            value={title}
            onChange={onChangeHdl}
            style={{ fontSize: '2rem' }}
            boxClass="form-floating"
            label="Article Title"
            formText={`You have left ${100 - title.length} charecter for your title.`}
          />

          <div className="mb-3">
            <Editor
              editorState={editorState}
              wrapperClassName="editor-wrap"
              editorClassName="editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: uploadImageCallBack,
                  alt: { present: true, mandatory: true },
                },
              }}
            />
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="mb-3">
            <label htmlFor="coverImage">Select a cover image</label>
            <input
              type="file"
              name="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="excerpt">Enter Excerpt Content</label>
            <textarea
              name="excerpt"
              className="form-control"
              value={excerpt}
              placeholder="Type your excerpt..."
              onChange={onChangeHdl}
              rows="8"
            />
            <div className="form-text">
              You have left {120 - excerpt.length} charecter for your excerpt.
            </div>
          </div>

          <Input
            type="text"
            className="form-control"
            name="tags"
            placeholder="tags"
            value={tags}
            onChange={onChangeHdl}
            boxClass="form-floating"
            label="Article Tags"
          />

          <CreateArticleCatSec checked={category} onChangeHdl={onChangeHdl} />
        </div>
      </div>
      <Button type="submit" className="btn-primary">
        {slug ? 'Update' : 'Publish'}
      </Button>

      <Notification message={message} />
    </form>
  );
}

export default CreateArticleForm;
