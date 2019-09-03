import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
    });
}
