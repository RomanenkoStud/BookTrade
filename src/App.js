import React, {useState} from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  if(!isLogin) {
    return <Login setIsSubmitted={setIsLogin} />
  }
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
