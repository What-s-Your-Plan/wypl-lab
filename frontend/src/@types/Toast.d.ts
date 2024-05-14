type ToastType = {
  id: number;
  type: 'NOTIFICATION' | 'ERROR' | 'WARN';
  message: string;
  duration: number;
};
