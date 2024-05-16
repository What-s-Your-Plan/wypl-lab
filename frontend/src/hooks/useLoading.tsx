import { useState } from 'react';

function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);

  const canStartLoading = (): boolean => {
    if (loading === true) {
      return true;
    }
    setLoading(true);
    return false;
  };

  const endLoading = () => {
    setLoading(false);
  };

  const isLoading = (): boolean => {
    return loading;
  };

  return { isLoading, canStartLoading, endLoading };
}

export default useLoading;
