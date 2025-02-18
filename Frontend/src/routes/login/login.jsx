import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Login() {

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false )
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)

    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const res = await apiRequest.post("/auth/login/", {
        username,
        password, 
      })
      console.log(res)
      // navigate("/")
    } catch (err) {
      setError(err.response.data.message || "Something went wrong")
    } 
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="password" required minLength={3} maxLength={15} type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
