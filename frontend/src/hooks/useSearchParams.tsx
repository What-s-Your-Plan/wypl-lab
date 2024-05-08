import { useEffect, useState } from 'react';

function useQueryParams(): { [name: string]: string } {
  const [params, setParams] = useState<{ [name: string]: string }>({});

  useEffect(() => {
    console.log('run');
    const temp: { [name: string]: string } = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      temp[key] = value;
    });
    setParams(temp);
  }, []);

  return params;
}

export default useQueryParams;
