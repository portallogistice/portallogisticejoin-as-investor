import { Store } from 'react-notifications-component';

export function notify(title, message, type = 'success') {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    dismiss: {
      duration: type === 'danger' ? 5000 : 3000,
      onScreen: true,
    },
  });
}
