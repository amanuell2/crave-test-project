import "./App.css";
import { TaskListContainer } from "./Components";
import TaskContextProvider from "./Context/TaskContext";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";
function App() {
  return (
    <div className="App min-h-screen flex items-center justify-center space-x-5 bg-white">
      <main className="App-main">
        <ApolloProvider client={client}>
          <TaskContextProvider>
            <TaskListContainer />
          </TaskContextProvider>
        </ApolloProvider>
      </main>
    </div>
  );
}

export default App;
