import logo from "./Misha.png";
import "./App.css";
import TodosContainer from "./TodosContainer";

function App() {
  console.log("calling App()");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is the todos list.</p>
        <TodosContainer />
      </header>
    </div>
  );
}

export default App;
