import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthField from "../../components/auth/AuthField";

function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      resetPassword({ email, password });
      navigate("/login", { replace: true });
    } catch (nextError) {
      setError(nextError.message);
    }
  };

  return (
    <section className="w-full max-w-[420px] rounded-3xl border border-line bg-card/90 p-6 shadow-[0_24px_60px_rgba(41,35,31,0.12)] backdrop-blur-md sm:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
        Set a new password
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        Reset password
      </h1>
      <p className="mt-2 text-sm text-quiet">
        Choose a new password for your ShoppyStore account.
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
          label="New password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        <AuthField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

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
          Update password
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-quiet">
        <Link
          to="/login"
          className="font-semibold text-accent hover:text-accent-hover"
        >
          Back to login
        </Link>
      </p>
    </section>
  );
}

export default ResetPassword;
