var percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

export function getColorForPercentage(pct) {
  // CREDIT: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor((lower.color.r * pctLower + upper.color.r * pctUpper) * 0.8),
    g: Math.floor((lower.color.g * pctLower + upper.color.g * pctUpper) * 0.8),
    b: Math.floor((lower.color.b * pctLower + upper.color.b * pctUpper) * 0.8),
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
}
