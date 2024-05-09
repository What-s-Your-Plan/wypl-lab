import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

import LoadingAnimation from './components/animation/Loading';

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
