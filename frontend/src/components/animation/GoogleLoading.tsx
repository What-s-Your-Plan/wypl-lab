import Lottie from 'lottie-react';

import google from '@/assets/lottie/google.json';

const style = {
  width: '300px',
};

function GoogleLoadingAnimation() {
  return <Lottie animationData={google} style={style}></Lottie>;
}

export default GoogleLoadingAnimation;
