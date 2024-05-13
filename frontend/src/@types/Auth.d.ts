type IssueTokenParams = {
  code: string;
};

type MockIssueTokenParams = {
  email: string;
};

type IssueTokenResponse = {
  member_id: number;
  access_token: string;
  refresh_token: string;
};

type ReissueTokenParams = {
  refresh_token: string;
};
