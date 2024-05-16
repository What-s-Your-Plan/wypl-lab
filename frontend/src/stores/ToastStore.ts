import { create } from 'zustand';

type AddToastContent = {
  message: string;
  type: 'NOTIFICATION' | 'ERROR' | 'WARN';
  duration: number;
};

type ToastState = {
  toasts: ToastContent[];
};

type ToastActions = {
  addToast: (content: AddToastContent) => void;
  removeToast: (id: number) => void;
};

const useToastStore = create<ToastState & ToastActions>()((set) => ({
  toasts: [],
  addToast: (content: AddToastContent) => {
    const id = Date.now();
    const newToast = { ...content, id };

    set((state) => {
      let newToasts = [...state.toasts, newToast];
      if (newToasts.length > 5) {
        newToasts = newToasts.slice(-5);
      }
      return { toasts: newToasts };
    });

    if (content.duration) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, content.duration * 10);
    }
  },
  removeToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
