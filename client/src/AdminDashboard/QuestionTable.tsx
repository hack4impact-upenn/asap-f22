/**
 * A file that contains all the components and logic for the table of users
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/PaginationTable';
import DeleteQuestionButton from './DeleteQuestionButton';
import { useData } from '../util/api';
import { IQuestion } from '../util/types/question';
import EditQuestionButton from './EditQuestionButton';
import { deleteResource } from './api';

interface AdminDashboardRow {
  key: string;
  question: string;
  deleteButton: React.ReactElement;
  edit: React.ReactElement;
}

/**
 * The standalone table component for holding information about the users in
 * the database and allowing admins to remove users and promote users to admins.
 */
function QuestionTable() {
  // define columns for the table
  const columns: TColumn[] = [
    {
      id: 'question',
      label: 'Question/Resource',
    },
    // { id: 'promote', label: 'Promote to Admin' },
    { id: 'edit', label: 'Edit' },
  ];

  // Used to create the data type to create a row in the table
  function createAdminDashboardRow(
    question: IQuestion, // IUser, //fix this to question type
    deleteButton: React.ReactElement,
    edit: React.ReactElement,
  ): AdminDashboardRow {
    const { _id, text } = question;
    return {
      key: _id,
      question: text,
      deleteButton,
      edit,
    };
  }

  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const questions = useData('admin/allQuestions'); // this is a route for GETTING ALL question data; TODO: update later

  // Upon getting the list of users for the database, set the state of the userList to contain all users except for logged in user
  useEffect(() => {
    setQuestionList(questions?.data);
  }, [questions]);

  // update state of userlist to remove a user from  the frontend representation of the data
  const removeResource = (question: IQuestion) => {
    setQuestionList(
      questionList.filter(
        (entry: IQuestion) =>
          entry &&
          entry.text &&
          entry.text !== question.text &&
          // eslint-disable-next-line no-underscore-dangle
          entry._id !== question._id,
      ),
    );
    // eslint-disable-next-line no-underscore-dangle
    deleteResource(question._id);
  };

  const handleEditChange = (oldQ: IQuestion, newQ: IQuestion) => {
    setQuestionList(
      questionList.map((q: IQuestion) =>
        // eslint-disable-next-line no-underscore-dangle
        q.text === oldQ.text && q._id === oldQ._id ? newQ : q,
      ),
    );
  };

  // if the questionlist is not yet populated, display a loading spinner
  if (!questionList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <PaginationTable
      rows={questionList.map((question: IQuestion) =>
        createAdminDashboardRow(
          question,
          <DeleteQuestionButton
            // eslint-disable-next-line no-underscore-dangle
            id={question._id}
            question={question}
            removeRow={() => removeResource(question)}
          />,
          <EditQuestionButton question={question} />,
        ),
      )}
      columns={columns}
    />
  );
}

export default QuestionTable;
