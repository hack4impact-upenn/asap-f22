import React, { useState } from 'react';
import LoadingButton from '../../components/buttons/LoadingButton';
import ConfirmationModal from '../../components/ConfirmationModal';
import { IDefinition } from '../../util/types/definition';
import { IAnswer } from '../../util/types/answer';

interface DeleteButtonProps {
  id: string;
  object: IDefinition | IAnswer;
  removeRow: (object: IDefinition | IAnswer) => void;
}

function DeleteButton({ id, object, removeRow }: DeleteButtonProps) {
  const [isLoading, setLoading] = useState(false);

  const isDefinition = (object as IDefinition).word !== undefined;

  const bodyString = `Are you sure you want to delete this ${
    isDefinition ? 'definition' : 'resource'
  }?`;

  async function handleDelete() {
    setLoading(true);
    removeRow(object);
    setLoading(false);
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <ConfirmationModal
      buttonText="Delete"
      title={bodyString}
      body="This action is permanent. Information will not be able to be recovered."
      onConfirm={() => handleDelete()}
    />
  );
}

export default DeleteButton;
