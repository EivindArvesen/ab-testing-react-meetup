import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { emitter } from 'react-ab-test';

import App from '../shared/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

/*
  Define test variants for our experiments
*/
const experiments = {
'Comment Link': ['Original', 'A', 'B']
};

Object.keys(experiments).forEach(key => {
if (experiments.hasOwnProperty(key)) {
  emitter.defineVariants(key, experiments[key]);

  // Ensure that user has an assigned experiment variation
  if (localStorage.getItem(`PUSHTELL-${key}`) === null) {
    // Get variants defined for experiment
    const sortedVariants = emitter.getSortedVariants(`${key}`);
    emitter.rewind(); // Avoid memory leaks
    // Get and assign random experiment variant
    const randomVariant = sortedVariants[Math.floor(Math.random() * sortedVariants.length)];
    localStorage.setItem(`PUSHTELL-${key}`, randomVariant);
  }
}
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
