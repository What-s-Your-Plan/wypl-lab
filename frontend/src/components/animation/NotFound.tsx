import Lottie from 'lottie-react';

import notFound from '@/assets/lottie/notFound.json';

const style = {
  width: '500px',
};

function NotFoundAnimation() {
  return <Lottie animationData={notFound} style={style}></Lottie>;
}

export default NotFoundAnimation;
