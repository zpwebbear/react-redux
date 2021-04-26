import { AppContainer } from "app/container/appContainer";
import { DialogContextProvider } from "app/dialog/application/context/DialogContextProvider";
import { TaskListContextProvider } from "features/task-list/application/context/TaskListContextProvider";
import { TaskListPage } from "pages/task-list/task-list-page/TaskListPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applicationStore } from "lib/redux/store/redux-store";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <AppContainer>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <TaskListContextProvider>
            <ReduxProvider store={applicationStore}>
              <DialogContextProvider>
                <div className="w-auto p-20">
                  <Switch>
                    <Route path="/task-list/:id" component={TaskListPage} />
                    <Route path="*">
                      <TaskListViewPage />
                    </Route>
                  </Switch>
                </div>
              </DialogContextProvider>
            </ReduxProvider>
          </TaskListContextProvider>
        </QueryClientProvider>
      </AppContainer>
    </Router>
  );
}

export default App;
