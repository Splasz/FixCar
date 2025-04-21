import { useState } from "react";
import supabase from "../../api/supabase";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

function LoginForm() {
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
      setMessage("Nieprawidłowy email lub hasło");
      return;
    }

    if (data) {
      navigate("/dashboard");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-full bg-text">
      <div
        className="flex justify-center items-center flex-col gap-6 w-fit rounded-3xl p-6 border-2 text-background border-[#3A3A3A]"
        style={{
          boxShadow: `
            0 0 300px 100px rgba(48, 126, 199, 0.45),
            0 4px 12px rgba(0, 0, 0, 1)              
          `,
        }}
      >
        <div className="text-7xl font-medium text-shadow-2xs p-6 ">Zaloguj</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="w-full">
            <TextField
              required
              className="w-full"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              size="small"
              type="email"
              variant="outlined"
              sx={{
                "& label": {
                  color: "#F8F9FA",
                },
                "& label.Mui-focused": {
                  color: "#F8F9FA",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F8F9FA",
                  },
                  "&:hover fieldset": {
                    borderColor: "#307EC7",
                  },
                  color: "#F8F9FA",
                },
              }}
            />
          </div>
          <div className="w-full flex justify-center">
            <TextField
              required
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
              label="Hasło"
              size="small"
              type="password"
              variant="outlined"
              sx={{
                "& label": {
                  color: "#F8F9FA",
                },
                "& label.Mui-focused": {
                  color: "#F8F9FA",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F8F9FA",
                  },
                  "&:hover fieldset": {
                    borderColor: "#307EC7",
                  },
                  color: "#F8F9FA",
                },
              }}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button type="submit" className="w-1/2" variant="contained">
              Zaloguj
            </Button>
          </div>
        </form>
        <hr className="border-1 border-gray-500 w-full " />
        <div className="text-sm">
          Nie masz jeszcze konta?{" "}
          <Link
            to={"/rejestracja"}
            className="font-bold hover:text-primary hover:underline"
          >
            Zarejestruj się
          </Link>
        </div>
        {message && <span className="text-accent text-sm">{message}</span>}
      </div>
    </div>
  );
}

export default LoginForm;
