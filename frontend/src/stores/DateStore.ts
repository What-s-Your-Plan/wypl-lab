import { create } from 'zustand';

type DateStates = {
  today: Date;
  selectedDate: Date;
  canlendarSchedules: CalendarSchedule[];
  labels: LabelResponse[];
  selectedLables: LabelResponse[];
};

type DateActions = {
  updateToday: () => void;
  setSelectedDate: (date: Date) => void;
  addSelectedLables: (labelId: number) => void;
  removeSelectedLables: (labelId: number) => void;
  clearSelectedLabels: () => void;
  setAllSelected: () => void;
};

const useDateStore = create<DateStates & DateActions>()((set, get) => ({
  today: new Date(),
  selectedDate: new Date(),
  canlendarSchedules: [],
  labels: [],
  selectedLables: [],
  updateToday() {
    set({ today: new Date() });
  },
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
  addSelectedLables: (labelId: number) => {
    set((state) => ({
      selectedLables: [
        ...state.selectedLables,
        state.labels.filter((label) => label.label_id === labelId)[0],
      ],
    }));
  },
  removeSelectedLables: (labelId: number) => {
    set((state) => ({
      selectedLables: state.selectedLables.filter(
        (label) => label.label_id !== labelId,
      ),
    }));
  },
  clearSelectedLabels: () => {
    set({ selectedLables: [] });
  },
  setAllSelected: () => {
    set({ selectedLables: get().labels });
  },
}));

export default useDateStore;
