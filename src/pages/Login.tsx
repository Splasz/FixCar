import { useState } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      navigate("/dashboard");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-highlight rounded-2xl w-1/2 p-6 flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <h2>Logowanie</h2>
      </div>
      <div className="flex  w-1/3 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Hasło"
          />
          <button
            type="submit"
            className="bg-primary text-background p-2 rounded-2xl cursor-pointer"
          >
            zaloguj
          </button>
        </form>
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}

export default Login;
