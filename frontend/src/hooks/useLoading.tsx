import { useState } from 'react';

function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = () => {
    setLoading(true);
  };

  const endLoading = () => {
    setLoading(false);
  };

  const isLoading = (): boolean => {
    return loading;
  };

  return { isLoading, startLoading, endLoading };
}

export default useLoading;
