const { abs, floor, log, min, round } = Math;
const abbreviations = "kMBTGE";

function rounded(v) {
  const precision = 10 ** 2;
  return round(v * precision) / precision;
}

export default function format(v) {
  const base = floor(log(abs(v)) / log(1000));
  const suffix = abbreviations[min(5, base - 1)];
  const baseAbbrev = abbreviations.indexOf(suffix) + 1;

  const votes = suffix ? rounded(v / 1000 ** baseAbbrev) + suffix : "" + v;
  return votes.indexOf("1000") > -1 ? `1${abbreviations[min(3, base)]}` : votes;
}
