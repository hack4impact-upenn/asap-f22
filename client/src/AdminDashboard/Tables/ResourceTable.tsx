/**
 * A file that contains all the components and logic for the table of resources
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../../components/PaginationTable';
import DeleteButton from '../Buttons/DeleteButton';
import { useData } from '../../util/api';
import { IAnswer } from '../../util/types/answer';
import EditButton from '../Buttons/EditButton';
import { deleteResource } from '../api';

interface ResourceRow {
  key: string;
  resource: string;
  edit: React.ReactElement;
  delete: React.ReactElement;
}

/**
 * The standalone table component for holding information about the users in
 * the database and allowing admins to remove users and promote users to admins.
 */
function ResourceTable() {
  // define columns for the table
  const columns: TColumn[] = [
    {
      id: 'resource',
      label: 'Resource',
    },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' },
  ];

  // Used to create the data type to create a row in the table
  function createResourceRow(
    resource: IAnswer,
    deleteButton: React.ReactElement,
    edit: React.ReactElement,
  ): ResourceRow {
    const { _id, text } = resource;
    return {
      key: _id,
      resource: text,
      edit,
      delete: deleteButton,
    };
  }

  const [resourceList, setResourceList] = useState<IAnswer[]>([]);
  const resources = useData('admin/allResources'); // this is a route for GETTING ALL resource data; TODO: update later

  // Upon getting the list of users for the database, set the state of the userList to contain all users except for logged in user
  useEffect(() => {
    const resourcesData = resources?.data;
    setResourceList(resourcesData);
  }, [resources]);

  // update state of userlist to remove a user from  the frontend representation of the data
  const removeResource = (resource: IAnswer) => {
    setResourceList(
      resourceList.filter(
        (entry: IAnswer) =>
          entry &&
          entry.text &&
          entry.text !== resource.text &&
          // eslint-disable-next-line no-underscore-dangle
          entry._id !== resource._id,
      ),
    );
    // eslint-disable-next-line no-underscore-dangle
    deleteResource(resource._id);
  };

  // if the resourcelist is not yet populated, display a loading spinner
  if (!resourceList) {
    return (
      <div style={{ margin: 'auto' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <PaginationTable
      rows={resourceList.map((resource: IAnswer) =>
        createResourceRow(
          resource,
          <DeleteButton
            // eslint-disable-next-line no-underscore-dangle
            id={resource._id}
            object={resource}
            removeRow={() => removeResource(resource)}
          />,
          <EditButton object={resource} />,
        ),
      )}
      columns={columns}
    />
  );
}

export default ResourceTable;
