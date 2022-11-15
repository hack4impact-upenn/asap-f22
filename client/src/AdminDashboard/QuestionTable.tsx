/**
 * A file that contains all the components and logic for the table of users
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/PaginationTable';
import DeleteUserButton from './DeleteUserButton';
import DeleteQuestionButton from './DeleteQuestionButton';
import PromoteUserButton from './PromoteUserButton';
import { useData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';
import IUser from '../util/types/user';
import { IQuestion } from '../util/types/question'; // '../../../server/src/models/question.model';
import EditQuestionButton from './EditQuestionButton';

interface AdminDashboardRow {
  key: string;
  question: string;
  // promote: React.ReactElement;
  remove: React.ReactElement;
  edit: React.ReactElement;
}

// const testq: IQuestion = {
//   //required params: text, resultantAnswerIds, isQuestion
//   text: '',
//   resultantAnswerIds: [],
//   isQuestion: true,

// };

/**
 * The standalone table component for holding information about the users in
 * the database and allowing admins to remove users and promote users to admins.
 */
function QuestionTable() {
  // define columns for the table
  const columns: TColumn[] = [
    { id: 'question', label: 'Question' },
    // { id: 'promote', label: 'Promote to Admin' },
    { id: 'remove', label: 'Remove Question' },
    { id: 'edit', label: 'Edit Question' },
  ];

  const [selectedRow, setSelectedRow] = useState({});

  // Used to create the data type to create a row in the table
  function createAdminDashboardRow(
    question: IQuestion, // IUser, //fix this to question type
    // promote: React.ReactElement,
    remove: React.ReactElement,
    edit: React.ReactElement,
  ): AdminDashboardRow {
    // const { _id, qstn } = user;
    const { _id, text, resultantAnswers, isQuestion } = question;
    return {
      key: _id,
      question: text,
      // resultantAnswerIds: resultantAnswerIds,
      // isQuestion: isQuestion,
      // promote,
      remove,
      edit,
    };
  }

  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const questions = useData('admin/allQuestions'); // this is a route for GETTING ALL question data; TODO: update later
  // TESTING:
  // const questions = testq;

  // const self = useAppSelector(selectUser);

  // Upon getting the list of users for the database, set the state of the userList to contain all users except for logged in user
  useEffect(() => {
    setQuestionList(
      // questions?.data.filter( //don't actually need the filter i think but it's fine just making sure text isn't empty
      //   (entry: IQuestion) => entry && entry.text,// && entry.text !== self.text,
      // ),
      questions?.data,
      // TESTING:
      // [questions, questions], //testing
    );
  }, [questions]); // [questions, self]); //should i actually be returning self here

  // update state of userlist to remove a user from  the frontend representation of the data
  const removeQuestion = (question: IQuestion) => {
    setQuestionList(
      questionList.filter(
        (entry: IQuestion) =>
          entry &&
          entry.isQuestion &&
          entry.text &&
          entry.text !== question.text, //! == question.text,
      ),
    );
  };

  const handleEditChange = (oldQ: IQuestion, newQ: IQuestion) => {
    // setQuestionList(event.target.value);
    removeQuestion(oldQ);
    // addQuestion(newQ);
    console.log('value is:', newQ.text);
  };

  function editRow(row: IQuestion, newText: string) {
    console.log('khgfjgfsjgfliglkghd');
    // row.text = newText; // 'hello ' + row.text;
  }

  // idrk what this is but updated it for question
  // update state of userlist to promote a user on the frontend representation
  // const updateQuestion = (text: string) => {
  //   setQuestionList(
  //     questionList.map((entry) => {
  //       if (entry.text !== text) {
  //         return entry;
  //       }
  //       const newEntry = entry;
  //       newEntry.isQuestion = true;
  //       return newEntry;
  //     }),
  //   );
  // };

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
            isQuestion={question.isQuestion}
            text={question.text}
            removeRow={() => removeQuestion(question)}
          />,
          // <DeleteQuestionButton
          //   isQuestion={question.isQuestion}
          //   text={question.text}
          //   removeRow={() => removeQuestion(question)}
          // />,

          <EditQuestionButton
            // eslint-disable-next-line no-underscore-dangle
            qID={question._id}
            isQuestion={question.isQuestion}
            text={question.text}
            editRow={() => editRow(question, '')}
            // open up text editor
            // extract inputted text data from text editor GUI
            // if isQuestion true --> replace current question.text with data from text editor GUI
            // else (isQuestion false) --> take answer IDs and resource descriptions to replace all resource description text with the data from text editor GUI
            // embedded links (clickable)
            // save and turn off editing mode
          />,

          // <PromoteUserButton
          //   isQuestion={question.isQuestion}
          //   email={question.text}
          //   updateAdmin={updateAdmin}
          // />,
        ),
      )}
      columns={columns}
    />

    // <TableRow
    //   onClick={() => setSelectedRow(row)}
    //   key={row.name}
    //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    // ></TableRow>
  );
}

export default QuestionTable;
