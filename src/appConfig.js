import { useTaskCreateProvider } from "features/task-list/infrastructure/providers/TaskCreateProvider";
import { useTaskCreateTemporaryProvider } from "features/task-list/infrastructure/providers/TaskCreateTemporaryProvider";

export const providerContainerConfig = [
  ["taskCreateProvider", useTaskCreateProvider],
  ["taskCreateTemporaryProvider", useTaskCreateTemporaryProvider],
];
