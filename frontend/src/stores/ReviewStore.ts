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
  setTitle: (title: string) => void;
  setScheduleId: (scheduleId: number) => void;
  setContent: (index: number, content: Content) => void;
  addContent: (type: ReviewType) => void;
};

const useReviewStore = create<ReviewState>()((set) => ({
  title: '',
  scheduleId: -1,
  contents: [],
  setTitle(newTitle: string) {
    set({ title: newTitle });
  },
  setScheduleId(newScheduleId: number) {
    set({ scheduleId: newScheduleId });
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
  addContent(blockType: ReviewType) {
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
        newContent = new WeatherContent('');
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
      contents: [...state.contents, newContent],
    }));
  },
}));

export default useReviewStore;
