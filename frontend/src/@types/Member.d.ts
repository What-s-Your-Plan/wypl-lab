import { BgColors } from '@/assets/styles/colorThemes';

type UpdateProfileImageResponse = {
  profile_image_url: string;
};

type UpdateNicknameRequest = {
  nickname: string;
};

type UpdateNicknameResponse = {
  nickname: string;
};

type FindMemberColorResponse = {
  colors: string[];
  color_count: number;
  select_color: string;
};

type FindMemberProfileResponse = {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
  main_color: string;
};

type UpdateLabelColorRequest = {
  color: BgColors;
};

type UpdateLabelColorResponse = {
  color: BgColors;
};
