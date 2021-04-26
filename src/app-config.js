import taskListUseCaseRegistry from "features/task-list/application/use-cases/use-case-registry";
import taskListUseQueryRegistry from "features/task-list/application/queries/use-query-registry";

export const useCaseRegistry = [...taskListUseCaseRegistry];

export const useQueryRegistry = [...taskListUseQueryRegistry];

export const useCommandRegistry = [];
