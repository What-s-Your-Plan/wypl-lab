import useQueryParams from '@/hooks/useSearchParams';

function GoogleOAuth() {
  const { code } = useQueryParams();

  // TODO: 로딩 화면 넣기

  return <div>{code}</div>;
}

export default GoogleOAuth;
