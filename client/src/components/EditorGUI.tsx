import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

export default function EditorGUI({ values, setValue, type, idx }: any) {
  const editor = useRef(null);

  let defaultText = '';
  if (type === 'question') {
    defaultText = values.question;
  } else if (type === 'title') {
    defaultText = values.answer.text;
  } else {
    defaultText = values.answer.resourceContent;
  }
  // change useState input if we store everything as html in db
  const [text, setText] = useState(`<p>${defaultText}</p>`);

  const updateTitle = ({ index }: any) => {
    const newArray = values.answer.map(({ item, i }: any) => {
      if (index === i) {
        return { ...item, text };
      }
      return item;
    });
    setValue('answer', newArray);
  };

  const updateDescription = ({ index }: any) => {
    const newArray = values.answer.map(({ item, i }: any) => {
      if (index === i) {
        return { ...item, resourceContent: text };
      }
      return item;
    });
    setValue('answer', newArray);
  };

  const handleUpdate = () => {
    if (type === 'question') {
      setValue(`${type}`, text);
    } else if (type === 'title') {
      updateTitle(idx);
    } else if (type === 'description') {
      updateDescription(idx);
    }
    console.log(values);
  };

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {/* {!text && <div>{defaultText}</div>} */}
      <JoditEditor ref={editor} value={text} onChange={setText} />
      <button type="button" onClick={() => handleUpdate()}>
        confirm
      </button>
    </div>
  );
}
