import './App.css';
import getBoard from "./fetch/getBoard";

const [image, setIm] = getBoard();

function App() {
  return (
    <div className="App">
      <h1>ourboARd</h1>
        <img src={image}/>
    </div>
  );
}

export default App;
