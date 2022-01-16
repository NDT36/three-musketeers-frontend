import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import RootWrapper from 'warappers/RootWrapper';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'components/AlertTemplate';

function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
        <Provider template={AlertTemplate} timeout={5000} position={positions.TOP_RIGHT}>
          <RootWrapper />
        </Provider>
      </Suspense>
    </HashRouter>
  );
}

export default App;
