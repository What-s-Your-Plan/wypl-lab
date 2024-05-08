import { create } from 'zustand';

type DateStates = {
  today: Date;
  selectedDate: Date;
};

type DateActions = {
  updateToday: () => void;
  setSelectedDate: (date: Date) => void;
};

const useDateStore = create<DateStates & DateActions>()((set) => ({
  today: new Date(),
  selectedDate: new Date(),
  updateToday() {
    set({ today: new Date() });
  },
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
}));

export default useDateStore;
