import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { getData } from '../util/api';
import EditorGUI from './EditorGUI';

export default function EditQuestion({ text, resultantAnswers }: any) {
  const defaultValues = {
    text: '',
    resultantAnswers: [],
  };

  const [values, setValueState] = useState(defaultValues);

  return (
    <div>
      <EditorGUI content={text} />
      {resultantAnswers.map((answer: { text: any }) => {
        return <EditorGUI content={answer.text} />;
      })}
    </div>
  );
}
