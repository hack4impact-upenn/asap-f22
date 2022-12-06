import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { deleteQuestion, deleteResource } from '../AdminDashboard/api';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from './EditorGUI';

export default function EditResource() {
  const resource = useLocation().state.question;

  const defaultValues = {
    question: resource.text,
    answer: resource.resultantAnswerIds,
  };
  const testAnswer1: IAnswer = {
    id: '638a3ec518384cbad7848f01',
    text: 'resource1',
    resourceContent: 'content1',
    resultantQuestionId: ' ',
  };
  const testAnswer2: IAnswer = {
    id: '638a3ede18384cbad7848f02',
    text: 'resource2',
    resourceContent: 'content2',
    resultantQuestionId: ' ',
  };
  // using test default question while DB IQuestion isn't final? confused bw TempQuestion and IQuestion
  const testDefaultQuestion: IQuestion = {
    // eslint-disable-next-line no-underscore-dangle
    _id: resource._id,
    text: resource.text,
    isQuestion: resource.isQuestion,
    resultantAnswers: [testAnswer1, testAnswer2],
  };

  const [values, setValueState] = useState(testDefaultQuestion);
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
