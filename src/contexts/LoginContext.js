import React, { Component } from "react";
import Main from "../components/Main/Main";
const { Provider, Consumer } = React.createContext();

class LoginContextProvider extends Component {
  constructor() {
    super();
    
    this.state = {
      logStatus: "LogIn"
    }
  }
  
  toggleLog = () => {
    this.setState(prevState => {
      return {
        logStatus: prevState.logStatus === "LogIn" ? "LogOut" : "LogIn"
      };
    });
  };

  render() {
    const dataContext = {
      logStatus: this.state.logStatus,
      toggleLog: this.toggleLog
    }

    return <Provider value={dataContext}>
      <Main />
    </Provider>;
  }
}

export { LoginContextProvider, Consumer as LoginContextConsumer };