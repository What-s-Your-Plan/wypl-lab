import { create } from 'zustand';

type DateStates = {
  today: Date;
  selectedDate: Date;
  calendarSchedules: Array<CalendarSchedule>;
  labels: LabelResponse[];
  selectedLabels: Array<number>;
};

type DateActions = {
  updateToday: () => void;
  setSelectedDate: (date: Date) => void;
  addSelectedLabels: (labelId: number) => void;
  removeSelectedLabels: (labelId: number) => void;
  clearSelectedLabels: () => void;
  setAllSelected: () => void;
};

const useDateStore = create<DateStates & DateActions>()((set, get) => ({
  today: new Date(),
  selectedDate: new Date(),
  calendarSchedules: [],
  labels: [],
  selectedLabels: [],
  updateToday() {
    set({ today: new Date() });
  },
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
  addSelectedLabels: (labelId: number) => {
    set((state) => ({
      selectedLabels: [...state.selectedLabels, labelId],
    }));
  },
  removeSelectedLabels: (labelId: number) => {
    set((state) => ({
      selectedLabels: state.selectedLabels.filter((label) => label !== labelId),
    }));
  },
  clearSelectedLabels: () => {
    set({ selectedLabels: [] });
  },
  setAllSelected: () => {
    set({
      selectedLabels: get().labels.map((label) => {
        return label.label_id;
      }),
    });
  },
}));

export default useDateStore;
