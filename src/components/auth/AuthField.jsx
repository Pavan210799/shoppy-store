import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function AuthField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-secondary">
        {label}
      </span>

      <span className="relative block">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            h-11
            w-full
            rounded-xl
            border border-line
            bg-muted
            px-3.5
            text-sm
            font-medium
            text-ink
            outline-none
            transition-all
            duration-200
            placeholder:text-subtle
            hover:border-line-hover
            focus:border-line-hover
            focus:bg-card
            focus:ring-2
            focus:ring-accent/10
            ${isPassword ? "pr-11" : ""}
          `}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-subtle transition-all duration-200 hover:bg-hover hover:text-accent active:scale-95"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.8} />
            ) : (
              <Eye size={16} strokeWidth={1.8} />
            )}
          </button>
        ) : null}
      </span>

      {error ? (
        <span className="mt-1.5 block text-[11px] font-medium text-accent">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default AuthField;
