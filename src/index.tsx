import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./App";
import RootStore from "./stores/RootStore";
import {Provider} from "mobx-react";
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const rootStore = new RootStore();

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <Router>
      <App/>
    </Router>
  </Provider>,
    document.getElementById('app')
);