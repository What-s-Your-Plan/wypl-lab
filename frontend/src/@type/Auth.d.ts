type IssueTokenParams = {
  code: string;
};

type IssueTokenResponse = {
  member_id: number;
  access_token: string;
  refresh_token: string;
};
