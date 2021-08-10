export const filterTags = (videos, initialTags) => {
  return videos.reduce((allTags, { tags }) => {
    // return [ ...new  Set([...allTags, ...tags])];
    tags.forEach((tag) => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
    return allTags;
  }, initialTags);
};
