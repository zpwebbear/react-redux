import { useRedirectCommand } from "./useRedirectCommand";

const appCommandRegistry = {
  "app/redirect": useRedirectCommand,
};

export default appCommandRegistry;
