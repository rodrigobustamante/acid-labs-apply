import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = {
  typography: {
    color: "#FFFFFF"
  },
  logo: {
    width: "100%",
    maxWidth: "50px"
  }
};

class Layout extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <AppBar color="primary">
          <Toolbar>
            <img
              className={classes.logo}
              src="/images/acidlabs.png"
              alt="acidlabs-logo"
            />
            <Typography variant="h6" classes={{ root: classes.typography }}>
              Acid Labs Apply - Capital Weather
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
