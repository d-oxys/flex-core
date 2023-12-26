import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import GetAllReport from '@/components/workoutPlan';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GetAllReport />
    </Provider>
  );
};

export default App;
