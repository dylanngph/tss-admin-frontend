import React, {useEffect, useState} from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme, createTheme } from '@mui/material/styles';
import Footer from "./components/display/Footer";
import Header from "./components/display/Header";
import NotFound from "./components/display/NotFound";
import Sidebar from "./components/display/Sidebar";
import LoginScreen from "./screens/account/components/Login";
import HomeScreen from "./screens/home";
import Projects from "./screens/project"
import ThemesScreen from "./screens/Themes";
import ProjectUnderReviewDetail from "./screens/home/ProjectDetail"
import ProjectDetail from "./screens/project/ProjectDetail"
import Users from "./screens/Users"
import Staffs from "./screens/Staffs"
import NFTSeal from "./screens/NFTSeal"
import TabPanel from "./screens/decentralization/Edit/Edit"
import Decentralization from "./screens/decentralization"
import NFTSealDetail from "./screens/NFTSealDetail"
import Container from "components/Container/Container";
import {adminData} from 'screens/admin/config'
import Cookies from 'js-cookie'
import useToken from "components/hook/useToken";


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
  const {token, setToken} = useToken();

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
          <Container className="wrap-container">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/projects" component={Projects} />
              <Route path="/themes" component={ThemesScreen} />
              <Route path="/project-under-review-detail" exact component={ProjectUnderReviewDetail} />
              <Route path="/nft-seal" exact component={NFTSeal} />
              <Route path="/nft-seal-detail" exact component={NFTSealDetail} />
              <Route path="/project-detail" exact component={ProjectDetail} />
              <Route path="/users" exact component={Users} />
              <Route path="/staffs" exact component={Staffs} />
              <Route path="/decentralization" exact component={Decentralization} />
              <Route path="/decentralization-detail" exact component={TabPanel} />
              
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
