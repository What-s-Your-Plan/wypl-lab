import Lottie from 'lottie-react';

import noContent from '@/assets/lottie/noContent.json';

const style = {
  width: '500px',
};

function NoContentAnimation() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <Lottie animationData={noContent} style={style}></Lottie>
    </div>
  );
}

export default NoContentAnimation;
