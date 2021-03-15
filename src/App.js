import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListVIewPage";

function App() {
  return (
    <Router>
      <Route path="task-list/:id" component={() => {}} />
      <Route path="*">
        <TaskListViewPage />
      </Route>
    </Router>
  );
}

export default App;
