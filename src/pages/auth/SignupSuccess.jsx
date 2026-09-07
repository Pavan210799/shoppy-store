import { CheckCircle2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignupSuccess() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signup" replace />;
  }

  const firstName = currentUser.name.split(" ")[0];

  return (
    <section className="w-full max-w-[420px] rounded-3xl border border-line bg-card/90 p-6 text-center shadow-[0_24px_60px_rgba(41,35,31,0.12)] backdrop-blur-md sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <CheckCircle2
          size={34}
          strokeWidth={1.8}
          className="animate-pop-in"
        />
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
        You are in
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        Welcome, {firstName}
      </h1>
      <p className="mt-2 text-sm leading-6 text-quiet">
        Your ShoppyStore account is ready. Cart and wishlist will stay saved to{" "}
        {currentUser.email}.
      </p>

      <Link
        to="/dashboard"
        state={{ boot: true }}
        className="
          mt-7
          inline-flex
          h-11
          w-full
          items-center
          justify-center
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
        Continue shopping
      </Link>
    </section>
  );
}

export default SignupSuccess;
