import { Content } from '@/objects/Content';

export type ReviewResponse = {
  review_id: number;
  created_at: string;
  title: string;
  schedule: ScheduleSimpleResponse;
  contents: Content[];
};
