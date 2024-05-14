import { useState } from 'react';

function useToast() {
  const [toasts, setToast] = useState<ToastType[]>([]);

  const removeToast = (id: number) => {
    setToast((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (newToast: ToastType) => {
    const id = Date.now();
    const toastWithId = { ...newToast, id };

    setToast((prev) => {
      const newToasts = [...prev, toastWithId];
      if (newToasts.length > 5) {
        return newToasts.splice(newToasts.length - 5, newToasts.length);
      }
      return newToasts;
    });

    if (newToast.duration) {
      setTimeout(() => removeToast(id), newToast.duration * 10);
    }
  };

  return { toasts, addToast };
}

export default useToast;
