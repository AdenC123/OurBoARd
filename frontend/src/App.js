import './App.css';
import Uploader from './components/Uploader';

function App() {
  return (
    <div className="App">
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" />
      <h1>ourboARd</h1>
      <Uploader/>
      
      
      {/* <button className="uploadFile" style={{
        padding: 10,
        border: 0,
      }}>+</button> */}

    </div>
  );
}

export default App;
