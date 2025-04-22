export const domainDetails = {
  name: "SkillShare",
  description: "A platform to share and discover skills.",
  server: window.location.hostname.includes("localhost")
    ? "http://localhost:3120/"
    : `${window.location.protocol}//${window.location.hostname}/`,
};
