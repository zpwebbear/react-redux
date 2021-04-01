import { DialogContextProvider } from "features/dialog/application/context/DialogContextProvider";
import { TaskListContextProvider } from "features/task-list/application/context/TaskListContextProvider";
import { TaskListPageProvider } from "pages/task-list/task-list-page/TaskListPageProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applicationStore } from "store/store";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <TaskListContextProvider>
        <Provider store={applicationStore}>
          <DialogContextProvider>
            <div className="w-auto p-20">
              <Router>
                <Switch>
                  <Route
                    path="/task-list/:id"
                    component={TaskListPageProvider}
                  />
                  <Route path="*">
                    <TaskListViewPage />
                  </Route>
                </Switch>
              </Router>
            </div>
          </DialogContextProvider>
        </Provider>
      </TaskListContextProvider>
    </QueryClientProvider>
  );
}

export default App;
