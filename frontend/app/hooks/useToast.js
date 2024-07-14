// hooks/useToast.js
import toast from 'react-hot-toast';

export const useToast = () => {
  const showToast = (message, type = 'default') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'loading':
        toast.loading(message);
        break;
      default:
        toast(message);
    }
  };

  return { showToast };
};