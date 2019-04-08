import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import LocationOn from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getWeather } from "./api/actions";
import ModalComponent from "./ModalComponent";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS;

const styles = {
  pin: {
    margin: "-30px 0px 0px -3px"
  }
};

const Marker = props => (
  <LocationOn lat={props.lat} lng={props.lng} className={props.style} />
);

class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleGetWeather = event => {
    const { getWeather } = this.props;
    getWeather(event.lat, event.lng);
    this.setState({ lat: event.lat, lng: event.lng, open: true });
  };

  render() {
    const { lat, lng } = this.props.weather;
    const { classes } = this.props;

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <ModalComponent
          open={this.state.open}
          closeDialog={() => this.handleCloseModal()}
        />
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey, language: "es" }}
          center={[lat, lng]}
          defaultZoom={5}
          options={{
            zoomControl: false,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            minZoom: 5,
            maxZoom: 5
          }}
          onClick={e => this.handleGetWeather(e)}
        >
          <Marker lat={lat} lng={lng} style={classes.pin} />
        </GoogleMapReact>
      </div>
    );
  }
}

MapComponent.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
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
  { getWeather }
)(withStyles(styles)(MapComponent));
