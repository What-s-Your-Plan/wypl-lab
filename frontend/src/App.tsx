import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';
import GoogleLoadingAnimation from './components/animation/GoogleLoading';

function App() {
  return (
    <Router>
      <Suspense fallback={<GoogleLoadingAnimation />}>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
