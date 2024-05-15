type ToastContent = {
  id: number;
  type: 'NOTIFICATION' | 'ERROR' | 'WARN';
  message: string;
  duration: number;
};

type NewToastContent = {
  type: 'NOTIFICATION' | 'ERROR' | 'WARN';
  message: string;
  duration: number;
};
