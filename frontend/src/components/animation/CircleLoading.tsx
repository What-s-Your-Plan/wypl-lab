import Lottie from 'lottie-react';

import loading from '@/assets/lottie/circleLoading.json';

const style = {
  width: '150px',
  height: '150px',
};

function CircleLoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Lottie animationData={loading} style={style}></Lottie>
    </div>
  );
}

export default CircleLoadingAnimation;
