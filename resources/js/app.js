require('./bootstrap');

import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import { InertiaProgress } from '@inertiajs/progress'

// ant design 
import 'antd/dist/antd.css';

// ionic
import '@ionic/react/css/core.css';

// redux imports
import { Provider } from "react-redux";
import configureStore from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

// redux constants
const { persistor, store } = configureStore();

const el = document.getElementById('app')



render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App
        initialPage={JSON.parse(el.dataset.page)}
        resolveComponent={name => require(`./Pages/${name}`).default}
      />
    </PersistGate>
  </Provider>,
  el
);

InertiaProgress.init({ color: '#4B5563' });
