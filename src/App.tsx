import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import RootWrapper from 'warappers/RootWrapper';

function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
        <RootWrapper />
      </Suspense>
    </HashRouter>
  );
}

export default App;
