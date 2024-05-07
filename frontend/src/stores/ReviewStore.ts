import { create } from 'zustand';

import {
  Content,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';

type ReviewState = {
  title: string;
  scheduleId: number;
  contents: Content[];
  focusIndex: number;
};

type ReviewAction = {
  setTitle: (newTitle: string) => void;
  setScheduleId: (newScheduleId: number) => void;
  setFocusIndex: (newFocusIndex: number) => void;
  setContent: (index: number, content: Content) => void;
  setContents: (contents: Content[]) => void;
  addContent: (index: number, type: ReviewType) => void;
  moveContent: (fromIndex: number, toIndex: number) => void;
  deleteContent: (targetIndex: number) => void;
};

const useReviewStore = create<ReviewState & ReviewAction>()((set, get) => ({
  title: '',
  scheduleId: -1,
  contents: [],
  focusIndex: -1,
  setTitle(newTitle: string) {
    set({ title: newTitle });
  },
  setScheduleId(newScheduleId: number) {
    set({ scheduleId: newScheduleId });
  },
  setFocusIndex(newFocusIndex: number) {
    console.log(newFocusIndex);
    set({ focusIndex: newFocusIndex });
  },
  setContent(index: number, newContent: Content) {
    set((state) => ({
      contents: [
        ...state.contents.slice(0, index),
        newContent,
        ...state.contents.slice(index + 1),
      ],
    }));
  },
  setContents(newContents: Content[]) {
    set({ contents: newContents });
  },
  addContent(index: number, blockType: ReviewType) {
    let newContent: Content;
    switch (blockType) {
      case 'text':
        newContent = new TextContent('');
        break;
      case 'picture':
        newContent = new PictureContent('');
        break;
      case 'emotion':
        newContent = new EmotionContent('', '');
        break;
      case 'weather':
        newContent = new WeatherContent('', '');
        break;
      case '4f':
        newContent = new FourFContent('', '', '', '');
        break;
      case 'kpt':
        newContent = new KPTContent('', '', '');
        break;
      default:
        console.error('Invalid blockType');
    }
    set((state) => ({
      contents: [
        ...state.contents.slice(0, index + 1),
        newContent,
        ...state.contents.slice(index + 1),
      ],
    }));
  },
  moveContent(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= get().contents.length) return;
    const arr = get().contents;
    arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    this.setFocusIndex(toIndex);
    set({
      contents: arr,
    });
  },
  deleteContent(targetIndex: number) {
    set((state) => ({
      contents: state.contents.filter((_, i) => i !== targetIndex),
      focusIndex: -1,
    }));
  },
}));

export default useReviewStore;
