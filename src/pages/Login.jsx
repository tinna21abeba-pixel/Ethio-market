import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("Invalid email or password.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (savedUser.role === "seller") {
      navigate("/seller");
    } else {
      navigate("/shop");
    }
  };

  return (
    <main>
      <h1>Sign In</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Sign In
        </button>
      </form>
    </main>
  );
}

export default Login;