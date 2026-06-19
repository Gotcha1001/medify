// // Format seconds for dashboard display
// export function formatDuration(sec) {
//   if (sec == null || sec === undefined) return "-";

//   const n = Number(sec);
//   if (Number.isNaN(n) || n < 0) return "-";
//   if (n === 0) return "0s";

//   const minutes = Math.floor(n / 60);
//   const seconds = n % 60;

//   return minutes > 0 ? `${m}m ${s}s` : `${s}s`;
// }

export function formatDuration(sec) {
  if (sec == null || sec === undefined) return "-";

  const n = Number(sec);
  if (Number.isNaN(n) || n < 0) return "-";
  if (n === 0) return "0s";

  const minutes = Math.floor(n / 60);
  const seconds = Math.floor(n % 60); // floor in case n is a float

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}
