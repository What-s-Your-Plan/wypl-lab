import { create } from 'zustand';

type DateStates = {
  today: Date;
  selectedDate: Date;
  labels: FilterResponse[];
  selectedLabels: Array<FilterResponse>;
};

type DateActions = {
  updateToday: () => void;
  setSelectedDate: (date: Date) => void;
  setLabels: (labels: FilterResponse[]) => void;
  addSelectedLabels: (labelId: FilterResponse) => void;
  removeSelectedLabels: (labelId: FilterResponse) => void;
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
  setLabels(labels: FilterResponse[]) {
    set({ labels: labels });
  },
  addSelectedLabels: (newLabel: FilterResponse) => {
    set((state) => ({
      selectedLabels: [...state.selectedLabels, newLabel],
    }));
  },
  removeSelectedLabels: (newLabel: FilterResponse) => {
    set((state) => ({
      selectedLabels: state.selectedLabels.filter((label) => label !== newLabel),
    }));
  },
  clearSelectedLabels: () => {
    set({ selectedLabels: [] });
  },
  setAllSelected: () => {
    set({
      // selectedLabels: get().labels.map((label) => {
      //   return label.id;
      // }),
      selectedLabels: {
        ...get().labels
      }
    });
  },
}));

export default useDateStore;
