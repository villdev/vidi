const formatDescription = (description: string) => {
  //   const paragraphs = description.split("<br/>");
  const paragraphs = description.split("<br/>").join("\n");
  return paragraphs;
};

export default formatDescription;
