import "./App.css";
import { TaskListContainer } from "./Components";
import TaskContextProvider from "./context/TaskContext";

function App() {
  return (
    <div className="App min-h-screen flex items-center justify-center space-x-5 bg-white">
      <main className="App-main">
        <TaskContextProvider>
          <TaskListContainer />
        </TaskContextProvider>
      </main>
    </div>
  );
}

export default App;
