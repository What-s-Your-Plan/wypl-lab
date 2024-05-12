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
  profile_image_url: string?;
  main_color: string;
};
