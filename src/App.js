import { UseCaseContainer } from "app/use-case-container/UseCaseContainer";
import { DialogContextProvider } from "app/dialog/application/context/DialogContextProvider";
import { TaskListContextProvider } from "features/task-list/application/context/TaskListContextProvider";
import { TaskListPage } from "pages/task-list/task-list-page/TaskListPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applicationStore } from "store/store";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <UseCaseContainer>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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
      </UseCaseContainer>
    </Router>
  );
}

export default App;
