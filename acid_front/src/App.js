import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapView from "./views/MapView";
import Layout from "./components/general/Layout";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { APP_ROUTES } from "./config/routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#38B449",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#3E3C3F",
      contrastText: "#FFFFFF"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path={APP_ROUTES.home} component={MapView} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;
