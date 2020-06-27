const a = ["k", "M", "B", "T"];
const p = 10;

export default function round(n) {
  // loop through the array backwards, so we do the largest first
  for (let i = a.length - 1; i >= 0; i -= 1) {
    // convert array index to "1000", "1000000", etc
    const s = p ** ((i + 1) * 3);

    // if n is larger or equal to s, abbreviate
    if (s <= n) {
      // multiply by d, round, and then divide by d to round to a specific decimal place.
      n = Math.round((n * p) / s) / p;

      // handle special cases where we round up to the next abbreviation
      if (n === 1000 && i < a.length - 1) {
        n = 1;
        i += 1;
      }

      // Add the letter for the abbreviation
      n += a[i];

      // We are done... stop
      break;
    }
  }

  return n.toString();
}
