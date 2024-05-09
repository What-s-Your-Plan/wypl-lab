import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';
import GoogleLoadingAnimation from './components/animation/GoogleLoading';

function App() {
  console.log(import.meta.env.MODE);
  return (
    <Router>
      <Suspense fallback={<GoogleLoadingAnimation />}>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
