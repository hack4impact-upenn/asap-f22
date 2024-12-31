/**
 * A file that contains all the components and logic for the table of users
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../../components/PaginationTable';
import { useData } from '../../util/api';
import { IQuestion } from '../../util/types/question';
import EditButton from '../Buttons/EditButton';

interface AdminDashboardRow {
  key: string;
  question: string;
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
      label: 'Question',
    },
    { id: 'edit', label: 'Edit' },
  ];

  // Used to create the data type to create a row in the table
  function createAdminDashboardRow(
    question: IQuestion,
    edit: React.ReactElement,
  ): AdminDashboardRow {
    const { _id, text } = question;
    return {
      key: _id,
      question: text,
      edit,
    };
  }

  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const questions = useData('admin/allQuestions'); // this is a route for GETTING ALL question data; TODO: update later

  // Upon getting the list of users for the database, set the state of the userList to contain all users except for logged in user
  useEffect(() => {
    const questionsData = questions?.data.filter(
      (question: IQuestion) => question.isQuestion,
    );
    setQuestionList(questionsData);
  }, [questions]);

  // if the questionlist is not yet populated, display a loading spinner
  if (!questionList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <PaginationTable
      rows={questionList.map((question: IQuestion) =>
        createAdminDashboardRow(question, <EditButton object={question} />),
      )}
      columns={columns}
    />
  );
}

export default QuestionTable;
