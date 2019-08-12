import { createContext } from "react";

export const ServerSideDataContext = createContext({
  data: {},
  clientSide: true
});
