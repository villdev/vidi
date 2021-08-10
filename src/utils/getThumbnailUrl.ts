export const getThumbnailUrl = (maxResUrl: string) => {
  return maxResUrl.slice(0, -17) + "mqdefault.jpg";
};
