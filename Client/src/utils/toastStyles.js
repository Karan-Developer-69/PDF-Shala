import { toast } from 'react-toastify';

// Custom toast theme
export const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Custom success toast with icon
export const successToast = (message) => {
  return toast.success(message, {
    ...toastConfig,
    style: { 
      background: "#f8f9fa",
      color: "#212529",
      borderLeft: "4px solid #8B5CF6"
    },
    icon: "🛒",
  });
};

// Custom error toast 
export const errorToast = (message) => {
  return toast.error(message, {
    ...toastConfig,
    style: { 
      background: "#f8f9fa",
      color: "#212529",
      borderLeft: "4px solid #ef4444"
    },
  });
};

export default {
  successToast,
  errorToast
}; 