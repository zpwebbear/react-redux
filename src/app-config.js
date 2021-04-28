import taskListUseCaseRegistry from "features/task-list/application/use-cases/use-case-registry";
import taskListUseQueryRegistry from "features/task-list/application/queries/use-query-registry";
import taskListCommandRegistry from "features/task-list/application/commands/use-command-registry";
import appCommandRegistry from "app/container/commands/use-command-registry";
import appQueryRegistry from "app/container/queries/use-query-registry";

export const useCaseRegistry = { ...taskListUseCaseRegistry };

export const useQueryRegistry = {
  ...taskListUseQueryRegistry,
  ...appQueryRegistry,
};

export const useCommandRegistry = {
  ...appCommandRegistry,
  ...taskListCommandRegistry,
};
