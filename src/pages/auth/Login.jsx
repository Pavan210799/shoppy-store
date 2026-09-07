import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthField from "../../components/auth/AuthField";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    try {
      login({ email, password });
      navigate("/dashboard", { replace: true });
    } catch (nextError) {
      setError(nextError.message);
    }
  };

  return (
    <section className="w-full max-w-[420px] rounded-3xl border border-line bg-card/90 p-6 shadow-[0_24px_60px_rgba(41,35,31,0.12)] backdrop-blur-md sm:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
        Welcome back
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        Log in to ShoppyStore
      </h1>
      <p className="mt-2 text-sm text-quiet">
        Pick up your cart, wishlist, and saved picks.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />

        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Forgot password?
          </Link>
        </div>

        {error ? (
          <p className="rounded-xl bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="
            h-11
            w-full
            rounded-xl
            bg-accent
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-accent-hover
            hover:shadow-[0_10px_20px_rgba(217,93,57,0.28)]
            active:translate-y-0
            active:scale-[0.99]
          "
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-quiet">
        New here?{" "}
        <Link
          to="/signup"
          className="font-semibold text-accent hover:text-accent-hover"
        >
          Create an account
        </Link>
      </p>
    </section>
  );
}

export default Login;
