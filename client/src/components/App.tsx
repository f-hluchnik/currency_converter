import logo from '../resources/coin.svg';
import './App.css';
import Form from "./Form"

function App() {

  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <Form />
      </div>
    </div>
  );
}

export default App;
