import React, {useEffect, useState} from "react";
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
import {adminData} from 'screens/admin/config'
import Cookies from 'js-cookie'


interface LoginProps {
  email: string,
  password: string
}

function App() {

  const theme = createTheme({
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
    }
  });
  const drawerWidth = 255;


  const [auth , setAuth] = useState(false)
  const [error , setError] = useState(false)
  const [user , setUser] = useState({email:""})

  const readCookies = () => {
    const userCookies = Cookies.get("user")
    if(userCookies){
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookies()
  }, [])

  const handleLogin = (values:LoginProps) => {
    for(let i = 0; i < adminData.length ; i++) {
        if(values.email === adminData[i].email){
            if(values.password === adminData[i].password){
              setUser({
                email: values.email
              })
              setError(false)
              setAuth(true)
              Cookies.set("user","loginTrue")
              return
            }
        }
    }
    setError(true)
    return auth
  }

  const handleLogout = () => {
    setUser({email:""})
    setAuth(false)
    Cookies.remove("user")
  }

  console.log(user)

  return (
    <ThemeProvider theme={theme}>
        {
          auth ? 
          <>
          <Header drawerWidth={drawerWidth} handleLogout={handleLogout} />
          <Sidebar drawerWidth={drawerWidth}/>
          <Container>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              {/* <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/forgotpass" component={ForgotPassScreen} /> */}
              <Route path="/projects" component={Projects} />
              <Route component={NotFound} />
            </Switch>
          </Container>
          </>
          :
          <LoginScreen handleLogin={handleLogin} error={error}/>
        }
    </ThemeProvider>
  );
}

export default App;
