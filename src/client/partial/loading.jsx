import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';


export default () => (
  <CircularProgress style={{ color: purple[500] }} className="loading-circle" size={50} />
);
