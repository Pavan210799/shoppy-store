function AuthBackground() {
  const sparks = [
    { top: "12%", left: "18%", delay: "0s" },
    { top: "22%", left: "78%", delay: "0.6s" },
    { top: "38%", left: "8%", delay: "1.2s" },
    { top: "48%", left: "92%", delay: "0.3s" },
    { top: "68%", left: "14%", delay: "1.8s" },
    { top: "74%", left: "62%", delay: "0.9s" },
    { top: "86%", left: "84%", delay: "1.4s" },
    { top: "16%", left: "48%", delay: "2s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-page" />

      <div
        className="
          absolute inset-0
          opacity-80
          [background-image:radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_34%),radial-gradient(circle_at_82%_78%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_32%),radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--bg-card)_55%,transparent),transparent_48%)]
        "
      />

      <div className="animate-auth-orb-a absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl dark:bg-accent/15" />
      <div className="animate-auth-orb-b absolute -bottom-28 -right-16 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl dark:bg-accent/10" />
      <div className="animate-auth-orb-c absolute left-[42%] top-[18%] h-56 w-56 rounded-full bg-soft/80 blur-3xl dark:bg-soft/40" />

      <div className="animate-auth-spin absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60" />
      <div className="animate-auth-spin absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25 [animation-direction:reverse] [animation-duration:36s]" />

      <div className="animate-auth-drift absolute left-[12%] top-[58%] h-24 w-24 rounded-3xl border border-line bg-card/40 backdrop-blur-sm" />
      <div className="animate-auth-drift absolute right-[10%] top-[22%] h-16 w-16 rounded-full border border-accent/30 bg-accent/10 [animation-delay:1.2s]" />
      <div className="animate-auth-drift absolute bottom-[16%] right-[28%] h-20 w-14 rounded-2xl border border-line bg-surface/50 [animation-delay:0.7s]" />

      {sparks.map((spark) => (
        <span
          key={`${spark.top}-${spark.left}`}
          className="animate-auth-twinkle absolute h-1.5 w-1.5 rounded-full bg-accent"
          style={{
            top: spark.top,
            left: spark.left,
            animationDelay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}

export default AuthBackground;
