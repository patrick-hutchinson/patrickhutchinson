export function sortByDate(a, b) {
  if (b.year !== a.year) {
    return b.year - a.year;
  }
  return b.month - a.month;
}
