import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomeScreen from './screens/homescreen';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {main: "#1976d2", light: "rgb(71, 145, 219)", dark: "rgb(17, 82, 147)", contrastText: "#fff"},
    secondary: {main: "rgb(220, 0, 78)", light: "rgb(227, 51, 113)", dark: "rgb(154, 0, 54)", contrastText: "#fff"},
    text: {primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", hint: "rgba(0, 0, 0, 0.38)"},
    chips:{relationships:"#c0392b", fitness:"#f39c12", work:"#2980b9", creative:"#16a085", other:"#2c3e50"}
  }
},
)



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 'currentPage': window.location.pathname }
  }

  render() {

    if (this.state.currentPage === "/") {
      return (
        <MuiThemeProvider theme={theme}>
          <HomeScreen />
        </MuiThemeProvider>
      )
    }

    else if (this.state.currentPage === "/account") {
      return (
        <MuiThemeProvider theme={theme}>
          <HomeScreen />
        </MuiThemeProvider>
      )
    }
  }
}

export default App;
