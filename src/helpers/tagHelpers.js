export const extractTags = (text) => {
    const words = text.split(/\s+/);
    const tags = [];
    for (const word of words) {
      if (word.startsWith("#")) {
        const tag = word.slice(1);
        tags.push(tag);
      }
    }
    return tags;
};

const processTagInput = (input) => {
    if (!input.startsWith('#') && input !== '') {
      return '#' + input;
    }
    return input;
};

export const handleSuggestionClick = (suggestion, setTagInput, setSuggestions) => {
  suggestion = processTagInput(suggestion);
  setTagInput(suggestion);
  setSuggestions([]);
};

export const handleInputChange = (e, setTagInput, tagsArray, setSuggestions) => {
    const inputText = e.target.value;
    const filteredTags = tagsArray.filter(tagObj => tagObj.name.startsWith(inputText[1])).map(tagObj => tagObj.name);
    setSuggestions(filteredTags);
    setTagInput(inputText);
}

// export const uploadTags = (tagsString, idForTags) => {
//   const tagsArray = extractTags(tagsString);
//   fetch(`${process.env.REACT_APP_SERVER_URI}/api/tags/add-tags`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       tagsArray, 
//       tagReviewId: idForTags,
//     })
//   })
// }