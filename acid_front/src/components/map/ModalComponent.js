import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { weatherIcons } from "../../constants/weather_icons";
import { unixToDate, getActualSeason, toFixed } from "../../helpers";

const styles = {
  weatherAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  dialogText: {
    textAlign: "center",
    width: "100%"
  }
};

class ModalComponent extends Component {
  render() {
    const {
      open,
      closeDialog,
      weather,
      isLoading,
      error,
      classes,
      fullScreen
    } = this.props;
    if (isLoading) {
      return (
        <Dialog open={open} onClose={closeDialog} fullScreen={fullScreen}>
          <DialogContent>
            <Grid container justify="center" alignItems="center">
              <CircularProgress size={100} color="primary" />
            </Grid>
          </DialogContent>
        </Dialog>
      );
    }
    if (error) {
      return (
        <Dialog open={open} onClose={closeDialog} fullScreen={fullScreen}>
          <DialogTitle>Uuuuuups!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              An error has occurred, please try again with another coordinates
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return (
      <Dialog open={open} onClose={closeDialog} fullScreen={fullScreen}>
        <Grid container justify="center" alignItems="center">
          <DialogTitle className={classes.dialogText}>
            Temperature on {weather.capital} - {weather.country}
          </DialogTitle>
        </Grid>
        <DialogContent>
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt={weatherIcons[weather.icon]}
              src={weatherIcons[weather.icon]}
              className={classes.weatherAvatar}
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dialogText} variant="h4">
              {weather.temperature} ºC
            </Typography>
          </Grid>
          {weather.coordinates && (
            <Grid container justify="center" alignItems="center">
              <Typography className={classes.dialogText} variant="h6">
                Actual season: {getActualSeason(weather.coordinates.lat)}
              </Typography>
            </Grid>
          )}
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dialogText} variant="h6">
              Humidity: {toFixed(weather.humidity * 100)}%
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dialogText} variant="h6">
              Wind Speed: {weather.windSpeed} mph
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dialogText} variant="h6">
              UV Index: {weather.uvIndex}
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dialogText} variant="h6">
              Probability of precipitation:{" "}
              {toFixed(weather.precipProbability * 100)}%
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <p className={classes.dialogText}>
              Update hour: {unixToDate(weather.time)}
            </p>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ModalComponent.propTypes = {
  weather: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    weather: state.weather.weather,
    isLoading: state.weather.isLoading,
    error: state.weather.error
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(withMobileDialog({ breakpoint: "xs" })(ModalComponent)));
