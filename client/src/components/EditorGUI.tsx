import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { IAnswer } from '../util/types/answer';
import { editQuestion } from '../AdminDashboard/api';

export default function EditorGUI({ values, setValue, type, idx }: any) {
  const editor = useRef(null);
  let defaultText = '';
  if (type === 'question') {
    defaultText = values.text;
  } else if (type === 'title') {
    defaultText = values.resultantAnswers[idx].text;
  } else {
    defaultText = values.resultantAnswers[idx].resourceContent;
  }
  // change useState input if we store everything as html in db
  const [text, setText] = useState(`<p>${defaultText}</p>`);

  const updateTitle = (index: any) => {
    // values.answer[index].text = text;
    const newArray = values.resultantAnswers.map((item: IAnswer, i: any) => {
      if (index === i) {
        const newAnswer: IAnswer = {
          // eslint-disable-next-line no-underscore-dangle
          _id: item._id,
          // eslint-disable-next-line object-shorthand
          text: text,
          resultantQuestionId: item.resultantQuestionId,
          resourceContent: item.resourceContent,
        };
        return newAnswer;
      }
      return item;
    });
    setValue('resultantAnswers', newArray);
  };

  const updateDescription = (index: any) => {
    const newArray = values.resultantAnswers.map((item: IAnswer, i: any) => {
      if (index === i) {
        const newAnswer: IAnswer = {
          // eslint-disable-next-line no-underscore-dangle
          _id: item._id,
          text: item.text,
          resultantQuestionId: item.resultantQuestionId,
          resourceContent: text,
        };
        return newAnswer;
      }
      return item;
    });
    setValue('resultantAnswers', newArray);
  };

  const handleUpdate = () => {
    if (type === 'question') {
      setValue('text', text);
    } else if (type === 'title') {
      updateTitle(idx);
    } else if (type === 'description') {
      updateDescription(idx);
    }
    console.log(values);
    editQuestion(values);
  };

  return (
    <div className="App">
      {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
      {/* {!text && <div>{defaultText}</div>} */}
      <JoditEditor ref={editor} value={text} onChange={setText} />
      <button type="button" onClick={() => handleUpdate()}>
        confirm
      </button>
    </div>
  );
}
