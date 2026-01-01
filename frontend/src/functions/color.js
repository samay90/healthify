export function getColor(percent,alpha=1) {
  percent = percent || 0;
  const r = Math.round(255 * (percent / 100));
  const g = Math.round(255 * (1 - percent / 100));
  return `rgb(${r}, ${g}, 100, ${alpha})`;
}
