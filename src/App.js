import "./App.css";
import { TaskListContainer } from "./Components";

function App() {
  return (
    <div className="App min-h-screen flex items-center justify-center space-x-5 bg-white">
      <main className="App-main">
        <TaskListContainer />
      </main>
    </div>
  );
}

export default App;
