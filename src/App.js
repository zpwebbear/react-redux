import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { TaskListPage } from "./pages/task-list/TaskListPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-auto p-20">
        <Router>
          <Switch>
            <Route path="/task-list/:id" component={TaskListPage} />
            <Route path="*">
              <TaskListViewPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
