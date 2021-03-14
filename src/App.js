import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import "./App.css";
import { TaskListPage } from "./pages/task-list/TaskListPage";

function App() {
  return (
    <Router>
      <Route path="task-list/:id" component={() => {}} />
      <Route path="*">
        <TaskListPage />
      </Route>
    </Router>
  );
}

export default App;
