import Lottie from 'lottie-react';

import loading from '@/assets/lottie/loading.json';

const style = {
  width: '500px',
};

function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <Lottie animationData={loading} style={style}></Lottie>;
    </div>
  );
}

export default LoadingAnimation;
