import { LogOut, UserRound, X } from "lucide-react";

function ProfileDrawer({ user, onClose, onLogout }) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <>
      <button
        type="button"
        aria-label="Close profile"
        onClick={onClose}
        className="animate-fade-in fixed inset-0 z-[60] cursor-default border-0 bg-ink/20 p-0 backdrop-blur-[2px]"
      />

      <aside
        className="
          animate-slide-in-right
          fixed right-0 top-0 z-[70]
          flex w-full max-w-[300px]
          flex-col
          rounded-bl-2xl
          border-b border-l border-line
          bg-card
          shadow-[-12px_0_32px_rgba(41,35,31,0.12)]
        "
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
          <div className="flex items-center gap-2.5">
            <UserRound
              size={18}
              strokeWidth={1.8}
              className="text-accent"
            />
            <h2 className="text-sm font-semibold text-ink">
              Profile
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-all duration-200 hover:scale-110 hover:bg-soft hover:text-accent active:scale-95"
          >
            <X
              size={18}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
          </button>
        </div>

        <div className="px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-page">
              {initials}
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {user.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-quiet">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="
              group
              mt-5
              inline-flex
              h-10
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border border-line
              bg-muted
              text-xs
              font-semibold
              text-secondary
              transition-all
              duration-200
              hover:border-accent
              hover:bg-accent
              hover:text-white
              active:scale-[0.99]
            "
          >
            <LogOut
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default ProfileDrawer;
