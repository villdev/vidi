export const getDuration = (duration: number) => {
  const durationString = duration.toString();
  if (durationString.split(".").length > 1) {
    return durationString.split(".").join(":");
  }
  return duration;
};
