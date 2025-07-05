import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useMovieStore from "../../store/useMovieStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, login } = useMovieStore();

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both fields.");
      return;
    }

    if (isRegistering) {
      const success = register(username, password);
      if (success) {
        alert("Registration successful!");
        setIsRegistering(false);
        setUsername("");
        setPassword("");
      } else {
        setError("User already exists.");
      }
    } else {
      const success = login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-screen">
      <div className="bg-white shadow p-6 rounded w-full max-w-sm">
        <h2 className="mb-4 font-semibold text-xl text-center">
          {isRegistering ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-2 border rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full btn btn-primary">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-500 underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-blue-500 underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
