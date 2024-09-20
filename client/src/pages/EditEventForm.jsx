import { useParams } from 'react-router-dom';
import EventForm from './EventForm';

const EditEventForm = () => {
  const { id } = useParams(); // Get the event ID from the URL

  return (
    <div>
      <h1>Edit Event</h1>
      {/* Pass the event ID to the EventForm to populate existing data */}
      <EventForm eventId={id} />
    </div>
  );
};

export default EditEventForm;