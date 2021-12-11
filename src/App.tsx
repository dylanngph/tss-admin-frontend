import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/display/Footer";
import Header from "./components/display/Header";
import NotFound from "./components/display/NotFound";
import Sidebar from "./components/display/Sidebar";
import ForgotPassScreen from "./screens/account/components/ForgotPass";
import LoginScreen from "./screens/account/components/Login";
import RegisterScreen from "./screens/account/components/Register";
import HomeScreen from "./screens/home";
import ApprovalProject from "./screens/project/components/Approval";
import ManageProject from "./screens/project/components/Manage";
import ThemesScreen from "./screens/Themes";
import Container from "components/Container/Container";

function App() {
  return (
    <div>
      <Sidebar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/forgotpass" component={ForgotPassScreen} />
          <Route path="/project/approval" component={ApprovalProject} />
          <Route path="/project/manage" component={ManageProject} />
          <Route path="/themes" component={ThemesScreen} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </Container>
    </div>
  );
}

export default App;
