import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { getData } from '../util/api';

export default function EditorGUI({ content }: any) {
  const editor = useRef(null);

  const defaultValues = {
    isQuestion: false,
    isAnswer: false,
    isResource: false,
    isResourceText: false,
    id: '',
    content: '',
  };

  const [values, setValueState] = useState(defaultValues);
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };
  // const [content, setContent] = useState<string>('');
  // const [isQuestion, setIsQuestion] = useState<boolean>(false);
  // const [isAnswer, setIsAnswer] = useState<boolean>(false);
  // const [isResource, setIsResource] = useState<boolean>(false);
  // const [isResourceText, setIsResourceText] = useState<boolean>(false);

  // const config = {
  //   readonly: false,
  //   height: 400
  // };
  const handleUpdate = (event: any) => {
    const editorContent = event.target.innerHTML;
    setValue('content', editorContent);
  };

  const handleClick = () => {
    const allQuestions = getData('admin/allQuestions');
    console.log(allQuestions);
  };

  return (
    <div className="App">
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <JoditEditor
        ref={editor}
        value={values.content}
        onChange={handleUpdate}
      />

      <button type="button">Submit</button>
    </div>
  );
}
