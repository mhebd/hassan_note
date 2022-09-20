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
import { usePage } from '../../../../context/page/PageProvider';
import Button from '../../../reusable/Button';
import Input from '../../../reusable/Input';
import Notification from '../../../reusable/Notification';

function CreatePageForm({ location }) {
  const { slug } = queryString.parse(location.search);

  // Initial Sate
  const [pageData, setPageData] = useState({
    title: '',
    inTopMenu: false,
    inFooterMenu: true,
  });

  const { title, inTopMenu, inFooterMenu } = pageData;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  // On submit handler
  const submitArticle = (e) => {
    e.preventDefault();

    if (slug) {
      if (!title) {
        toast.warn('All the field is required');
      } else if (draftToHtml(convertToRaw(editorState.getCurrentContent())).length < 15) {
        toast.warn('content must at least 15 charecter long.');
      } else {
        updatePage(
          { ...pageData, content: draftToHtml(convertToRaw(editorState.getCurrentContent())) },
          pageData._id
        );
      }
    } else if (!title) {
      toast.warn('All the field is required');
    } else if (draftToHtml(convertToRaw(editorState.getCurrentContent())).length < 15) {
      toast.warn('content must at least 15 charecter long.');
    } else {
      createPage({
        ...pageData,
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      });
    }
  };

  // Get provider variable

  const { createPage, updatePage, getPage, page, message } = usePage();

  // Handle effects
  useEffect(() => {
    if (slug) getPage(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (slug && page) setPageData(page);
    console.log(page);

    if (slug && page) {
      const blocksFromHtml = htmlToDraft(page?.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [page, slug]);

  // const uploadImageCallBack = async (file) => {
  //   const data = new FormData();
  //   data.append('image', file);
  //   let url;

  //   try {
  //     const res = await axios.post(`/api/v1/upload-img`, data, {
  //       headers: { 'Content-type': 'application/json' },
  //     });

  //     console.log(res.data);
  //     url = res.data.url;
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //   }

  //   return url;
  // };

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
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });

  return (
    <form onSubmit={submitArticle} encType="multipart/form-data" className="add-article">
      <div className="row mb-5">
        <div className="col-lg-8 mb-4">
          <Input
            type="text"
            className="form-control"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setPageData({ ...pageData, [e.target.name]: e.target.value })}
            style={{ fontSize: '2rem' }}
            boxClass="form-floating"
            label="Page Title"
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="inTopMenu"
              checked={inTopMenu}
              className="form-check-input"
              onChange={(e) => setPageData({ ...pageData, [e.target.name]: e.target.checked })}
            />
            <label htmlFor="inTopMenu" className="form-check-label">
              Show in top menu
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="inFooterMenu"
              checked={inFooterMenu}
              className="form-check-input"
              onChange={(e) => setPageData({ ...pageData, [e.target.name]: e.target.checked })}
            />
            <label htmlFor="inFooterMenu" className="form-check-label">
              Show in footer menu
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" className="btn-primary">
        {slug ? 'Update' : 'Publish'}
      </Button>

      <Notification message={message} />
    </form>
  );
}

export default CreatePageForm;
