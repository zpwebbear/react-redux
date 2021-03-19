import { TaskListProvider } from "features/task-list/application/context/TaskListProvider";
import { TaskListPageProvider } from "pages/task-list/task-list-page/TaskListPageProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-auto p-20">
        <TaskListProvider>
          <Router>
            <Switch>
              <Route path="/task-list/:id" component={TaskListPageProvider} />
              <Route path="*">
                <TaskListViewPage />
              </Route>
            </Switch>
          </Router>
        </TaskListProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
