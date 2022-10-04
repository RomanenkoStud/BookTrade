import React, {useState} from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  if(!isLogin) {
    return <Login setIsSubmitted={setIsLogin} />
  }
  return (
    <div className="App">
      <Dashboard setLogin={setIsLogin}/>
    </div>
  );
}

export default App;
