export const pageCount = (wordCount) => {
  if (wordCount > 100) {
    let temp = Math.round(wordCount / 100);
    return temp;
  } else {
    return 1;
  }
};
