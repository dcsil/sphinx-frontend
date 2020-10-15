import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FlaskTestButton } from './components/dummy/flask';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={require('./image/sphinx_icon.png')} className="App-logo" alt="logo" />
                <FlaskTestButton />
            </header>
        </div>
    );
}

export default App;
