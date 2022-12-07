import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { deleteQuestion, deleteResource } from '../AdminDashboard/api';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from './EditorGUI';

export default function EditResource() {
  const defaultResource: IQuestion = useLocation().state.question;

  const [values, setValueState] = useState(defaultResource);
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };

  return (
    <div>
      <h2> Question Title </h2>
      <EditorGUI values={values} setValue={setValue} type="question" />
      <br />
      {values.resultantAnswers.map((ans: IAnswer, idx: any) => {
        return (
          <div>
            <h2> Resource {idx}</h2>
            <button type="button" onClick={() => deleteResource(values, ans)}>
              Delete
            </button>
            <h3> Title </h3>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="title"
              idx={idx}
            />{' '}
            <br />
            <h3> Content </h3>
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
