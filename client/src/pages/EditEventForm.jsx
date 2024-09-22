import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import EventForm from './EventForm';
import { GET_EVENT } from '../utils/queries';
import { DELETE_EVENT } from '../utils/mutations';

const EditEventForm = ({ user }) => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id } });
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (data && data.event && data.event.createdBy !== user._id) {
      // If the user is not the creator, set isAuthorized to false
      setIsAuthorized(false);
    }
  }, [data, user]);

  const handleDelete = async () => {
    try {
      await deleteEvent({ variables: { id } });
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Edit Event</h1>
      {/* Pass the event ID to the EventForm to populate existing data */}
      <EventForm eventId={id} />
      {/* Conditionally render the delete button based on authorization */}
      {isAuthorized && (
        <button
          className="button delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      {!isAuthorized && <p>You do not have permission to edit this event.</p>}
    </div>
  );
};

export default EditEventForm;