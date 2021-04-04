import { ProviderContainer } from "app/provider-container/ProviderContainer";
import { DialogContextProvider } from "features/dialog/application/context/DialogContextProvider";
import { TaskListContextProvider } from "features/task-list/application/context/TaskListContextProvider";
import { TaskListPage } from "pages/task-list/task-list-page/TaskListPage";
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
    <Router>
      <ProviderContainer>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <TaskListContextProvider>
            <Provider store={applicationStore}>
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
            </Provider>
          </TaskListContextProvider>
        </QueryClientProvider>
      </ProviderContainer>
    </Router>
  );
}

export default App;
