import { formatDistanceToNowStrict } from 'date-fns';


    export const formatMessageDate = (date) => {
      const now = new Date();
      const messageDate = new Date(date);
      
      // Check how long ago the message was sent
      const distance = formatDistanceToNowStrict(messageDate, { addSuffix: true });
    
      // Return the human-readable format
      if (messageDate > now) {
        return 'Just now';
      }
    
      return distance;
    }
