import { Content } from '@/objects/Content';
import { create } from 'zustand';

type ReviewState = {
  title: string;
  scheduleId: number;
  contents: Content[];
};

const useReviewStore = create<ReviewState>()((set) => ({
  title: '',
  scheduleId: -1,
  contents: [],
}));
