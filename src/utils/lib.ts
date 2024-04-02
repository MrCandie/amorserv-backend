export const filterDate = function filterDate(milliseconds: number) {
  const daysMilli = Date.now() - milliseconds;
  return new Date(daysMilli);
};
