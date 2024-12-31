/**
 * A file that contains all the components and logic for the table of definitions
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../../components/PaginationTable';
import DeleteButton from '../Buttons/DeleteButton';
import { useData } from '../../util/api';
import { IDefinition } from '../../util/types/definition';
import EditButton from '../Buttons/EditButton';
import { deleteDefinition } from '../api';

interface DefinitionRow {
  key: string;
  definition: string;
  delete: React.ReactElement;
  edit: React.ReactElement;
}

/**
 * The standalone table component for holding information about the users in
 * the database and allowing admins to remove users and promote users to admins.
 */
function DefinitionTable() {
  // define columns for the table
  const columns: TColumn[] = [
    {
      id: 'definition',
      label: 'Definition',
    },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' },
  ];

  // Used to create the data type to create a row in the table
  function createDefinitionRow(
    definition: IDefinition,
    deleteButton: React.ReactElement,
    edit: React.ReactElement,
  ): DefinitionRow {
    const { _id, word } = definition;
    return {
      key: _id,
      definition: word,
      edit,
      delete: deleteButton,
    };
  }

  const [definitionList, setDefinitionList] = useState<IDefinition[]>([]);
  const definitions = useData('admin/allDefinitions');

  useEffect(() => {
    const definitionsData = definitions?.data;
    setDefinitionList(definitionsData);
  }, [definitions]);

  // update state of userlist to remove a user from  the frontend representation of the data
  const removeDefinition = (definition: IDefinition) => {
    setDefinitionList(
      definitionList.filter(
        (entry: IDefinition) =>
          entry &&
          entry.word &&
          entry.word !== definition.word &&
          // eslint-disable-next-line no-underscore-dangle
          entry._id !== definition._id,
      ),
    );
    // eslint-disable-next-line no-underscore-dangle
    deleteDefinition(definition._id);
  };

  // if the definitionlist is not yet populated, display a loading spinner
  if (!definitionList) {
    return (
      <div style={{ margin: 'auto' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <PaginationTable
      rows={definitionList.map((definition: IDefinition) =>
        createDefinitionRow(
          definition,
          <DeleteButton
            // eslint-disable-next-line no-underscore-dangle
            id={definition._id}
            object={definition}
            removeRow={() => removeDefinition(definition)}
          />,
          <EditButton object={definition} />,
        ),
      )}
      columns={columns}
    />
  );
}

export default DefinitionTable;
