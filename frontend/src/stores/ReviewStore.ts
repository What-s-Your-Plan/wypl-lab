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
  setContents: (contents: Content[]) => void;
  addContent: (index: number, type: ReviewType) => void;
  moveContent: (fromIndex: number, toIndex: number) => void;
};

const useReviewStore = create<ReviewState>()((set, get) => ({
  title: '',
  scheduleId: -1,
  contents: [new TextContent(0, ''), new EmotionContent(1, '', '')],
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
  setContents(newContents: Content[]) {
    set({ contents: newContents });
  },
  addContent(index: number, blockType: ReviewType) {
    let newContent: Content;
    switch (blockType) {
      case 'text':
        newContent = new TextContent(get().contents.length, '');
        break;
      case 'picture':
        newContent = new PictureContent(get().contents.length, '');
        break;
      case 'emotion':
        newContent = new EmotionContent(get().contents.length, '', '');
        break;
      case 'weather':
        newContent = new WeatherContent(get().contents.length, '', '');
        break;
      case '4f':
        newContent = new FourFContent(get().contents.length, '', '', '', '');
        break;
      case 'kpt':
        newContent = new KPTContent(get().contents.length, '', '', '');
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
    const content = get().contents[fromIndex];
    get().contents.splice(fromIndex, 1);
    if (fromIndex < toIndex) {
      set((state) => ({
        contents: [
          ...state.contents.slice(0, toIndex - 1),
          content,
          ...state.contents.slice(toIndex - 1),
        ],
      }));
    } else {
      set((state) => ({
        contents: [
          ...state.contents.slice(0, toIndex),
          content,
          ...state.contents.slice(toIndex),
        ],
      }));
    }
  },
}));

export default useReviewStore;
