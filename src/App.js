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
      let mode = new URLSearchParams(window.location.search).get('m') || 'okrs';
      if (mode==='okrs'){
        return (
          <MuiThemeProvider theme={theme}>
            <HomeScreen mode={0}/>
          </MuiThemeProvider>
        )
      }
      else if (mode==='copom'){
        return (
          <MuiThemeProvider theme={theme}>
            <HomeScreen mode={1}/>
          </MuiThemeProvider>
        )
      }
      
    }
  }
}

export default App;
