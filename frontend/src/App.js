import './App.css';
import Uploader from './components/Uploader';

function App() {
  var perf = require('./imageTexture.html')

  return (
    <div className="App">
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" />
      <h1>ourboARd</h1>
      <Uploader/>

      <iframe src={perf}></iframe>
      
      
      {/* <button className="uploadFile" style={{
        padding: 10,
        border: 0,
      }}>+</button> */}

    </div>
  );
}

export default App;
