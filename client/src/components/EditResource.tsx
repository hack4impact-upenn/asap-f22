import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditorGUI from './EditorGUI';

export default function EditResource() {
  const resource = useLocation().state.question;

  const defaultValues = {
    question: resource.text,
    answer: resource.resultantAnswers,
  };

  const [values, setValueState] = useState(defaultValues);
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };

  return (
    <div>
      <EditorGUI values={values} setValue={setValue} type="question" />
      <br />
      {values.answer.map(({ ans, idx }: any) => {
        return (
          <div>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="title"
              idx={idx}
            />{' '}
            <br />
            <EditorGUI
              values={values}
              setValue={setValue}
              type="description"
              idx={idx}
            />{' '}
          </div>
        );
      })}
    </div>
  );
}
