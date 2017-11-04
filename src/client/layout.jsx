import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MediaQuery from 'react-responsive';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Layout = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <MediaQuery maxWidth={960}>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </MediaQuery>
        <Typography type="title" color="inherit" className={classes.flex}>
          Title
        </Typography>
      </Toolbar>
    </AppBar>
    {children}
  </div>
);

export default withStyles(styles)(Layout);
