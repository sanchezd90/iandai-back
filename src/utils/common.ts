interface WordDefinition {
  word: string;
  definition: string;
}

function csvToObjectArray(csvString: string): WordDefinition[] | null {
  // Split the CSV string into an array of lines
  const lines = csvString.split('\n');
  if (lines.length < 7 || lines.length > 8) return null;
  
  // Initialize an empty array to store the result objects
  const resultArray: WordDefinition[] = [];

  // Iterate over the lines starting from index 1 (skipping the header)
  const index = lines.length === 7 ? 0 : 1;
  for (let i = index; i < lines.length; i++) {
    const line = lines[i].split(',');

    // Create an object with word and definition keys using the header indices
    const obj: WordDefinition = {
      word: line[0].trim(),
      definition: line[1].trim(),
    };

    // Push the object to the result array
    resultArray.push(obj);
  }

  return resultArray;
}

export { csvToObjectArray }; 