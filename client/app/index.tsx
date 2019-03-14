import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// import sass files
import './styles/style.sass';

render(<App />, document.querySelector('#root'));

// absolutely needed for react hmr to work
// if using typescript, be sure to install @types/webpack -D
module.hot.accept();
