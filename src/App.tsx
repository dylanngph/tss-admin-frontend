import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme, createTheme } from '@mui/material/styles';
import Footer from "./components/display/Footer";
import Header from "./components/display/Header";
import NotFound from "./components/display/NotFound";
import Sidebar from "./components/display/Sidebar";
import ForgotPassScreen from "./screens/account/components/ForgotPass";
import LoginScreen from "./screens/account/components/Login";
import RegisterScreen from "./screens/account/components/Register";
import HomeScreen from "./screens/home";
import Projects from "./screens/project"
import Container from "components/Container/Container";

function App() {

  const theme = createTheme();
  const THEME = createMuiTheme({
    typography: {
      "fontFamily": `"Inter", sans-serif`,
      "fontSize": 14,

      h3: {
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "22px",
        color: "#11142D",
      },

      h4: {
        fontSize: "24px",
        fontWeight: "bold",
        lineHeight: "29px",
        color: "#11142D",

        [theme.breakpoints.down('md')]: {
          fontSize: "18px",
          lineHeight: "22px",
        },
      },

      h5: {
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "19px",
      },

      body1: {
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "17px",
        color: "#58667E",
      }
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <Sidebar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/forgotpass" component={ForgotPassScreen} />
          <Route path="/projects" component={Projects} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
