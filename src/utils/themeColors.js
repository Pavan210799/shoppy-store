export function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);

  const read = (name) =>
    styles.getPropertyValue(name).trim();

  return {
    ink: read("--text-ink") || "#29231f",
    secondary: read("--text-secondary") || "#62584f",
    subtle: read("--text-subtle") || "#9a9087",
    accent: read("--accent") || "#d95d39",
    card: read("--bg-card") || "#ffffff",
    line: read("--border-line") || "#e5ddd3",
    image: read("--bg-image") || "#f7f2ec",
    soft: read("--bg-soft") || "#eee7df",
  };
}
