import './App.css';
import Uploader from './components/Uploader';
import ARScene from './ARScene'

function App() {

  return (
    <div className="App">
      <h1>ourboARd</h1>
      <Uploader/>
      <ARScene />
      
      
      {/* <button className="uploadFile" style={{
        padding: 10,
        border: 0,
      }}>+</button> */}

    </div>
  );
}

export default App;
