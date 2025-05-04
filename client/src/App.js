import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Login from "./Components/Login";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <GoogleOAuthProvider clientId="460043161835-nqq3mgs962vpvgk897kami6fpjlp663f.apps.googleusercontent.com">
        <div className="App">
          <h1>HypeJournal</h1>
          {!name && <Login setName={setName}/>}
          {name && <h2>Hey {name}!</h2>}
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
