const { abs, floor, log, min, round } = Math;
const abbreviations = "KMBT";

function rounded(v) {
  const precision = 10 ** 1;
  return round(v * precision) / precision;
}

export default function format(v) {
  const base = floor(log(abs(v)) / log(1000));
  const suffix = abbreviations[min(3, base - 1)];
  const baseAbbrev = abbreviations.indexOf(suffix) + 1;

  const votes = suffix ? rounded(v / 1000 ** baseAbbrev, 1) + suffix : "" + v;
  return votes === "1000K" ? "1M" : votes;
}
