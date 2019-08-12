import React from "react";
import PropTypes from "prop-types";

import { ServerSideDataContext } from "./ServerSideDataContext";

export const ServerSideData = ({ data, children, clientSide = true }) => {
  return (
    <ServerSideDataContext.Provider
      value={{
        data,
        clientSide
      }}
    >
      {children}
    </ServerSideDataContext.Provider>
  );
};

ServerSideData.propTypes = {
  children: PropTypes.node,
  clientSide: PropTypes.bool,
  data: PropTypes.any
};
