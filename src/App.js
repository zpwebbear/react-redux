import { AppContainer } from "app/container/appContainer";
import { DialogContextProvider } from "app/dialog/application/context/DialogContextProvider";
import { applicationStore } from "lib/redux/store/redux-store";
import { TaskListPage } from "pages/task-list/task-list-page/TaskListPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TaskListViewPage } from "./pages/task-list/TaskListViewPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <AppContainer>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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
        </QueryClientProvider>
      </AppContainer>
    </Router>
  );
}

export default App;
