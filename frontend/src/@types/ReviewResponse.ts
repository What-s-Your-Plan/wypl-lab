import { Content } from '@/objects/Content';

export type ReviewResponse = {
  review_id: number;
  created_at: string;
  title: string;
  schedule: ScheduleSimpleResponse;
  contents: Content[];
};

export type Review = {
  review_id: number;
  created_at: string; //ex) "2024-04-22T12:44:00"
  title: string;
  thumbnail_content: Content;
};
