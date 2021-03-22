import { TaskListContextProvider } from "features/task-list/application/context/TaskListContextProvider";
import { TaskListPageProvider } from "pages/task-list/task-list-page/TaskListPageProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DialogContextProvider } from "features/dialog/application/context/DialogContextProvider";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogContextProvider>
        <div className="w-auto p-20">
          <TaskListContextProvider>
            <Router>
              <Switch>
                <Route path="/task-list/:id" component={TaskListPageProvider} />
                <Route path="*">
                  <TaskListViewPage />
                </Route>
              </Switch>
            </Router>
          </TaskListContextProvider>
        </div>
      </DialogContextProvider>
    </QueryClientProvider>
  );
}

export default App;
