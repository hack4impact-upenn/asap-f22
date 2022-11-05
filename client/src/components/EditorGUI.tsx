import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditorGUI({ id }: { id: string }) {
  const [convertedText, setConvertedText] = useState<string>('Default content');

  const getContent = () => {
    // get the question/answer we want to change
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={convertedText}
        onChange={setConvertedText}
        style={{ minHeight: '300px' }}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
