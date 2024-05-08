import { create } from 'zustand';

type DateStates = {
  today: Date;
  selectedDate: Date;
  labels: LabelResponse[];
  selectedLables: Array<number>;
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
      selectedLables: [...state.selectedLables, labelId],
    }));
  },
  removeSelectedLables: (labelId: number) => {
    set((state) => ({
      selectedLables: state.selectedLables.filter((label) => label !== labelId),
    }));
  },
  clearSelectedLabels: () => {
    set({ selectedLables: [] });
  },
  setAllSelected: () => {
    set({
      selectedLables: get().labels.map((label) => {
        return label.label_id;
      }),
    });
  },
}));

export default useDateStore;
