import React from 'react';
import ReactDOM from 'react-dom';
import './app.less'
const App = () => {
    return (
        <div>
            <h1 className='app'>Hello R1212eact and Webpack</h1>
        </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById('app'));