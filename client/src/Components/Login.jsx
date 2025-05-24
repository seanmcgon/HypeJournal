import { GoogleLogin } from "@react-oauth/google";

async function login(token, setName, setEmail, setLogs) {
  try {
    const response = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token.credential }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setName(json.user.name);
    setEmail(json.user.email);
    setLogs(json.logs);
  } catch (error) {
    console.error(error.message);
  }
}

export default function Login({setName, setEmail, setLogs}) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        login(credentialResponse, setName, setEmail, setLogs);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
      auto_select
      shape="pill"
    />
  );
}
