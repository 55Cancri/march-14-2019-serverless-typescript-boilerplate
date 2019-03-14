// capitalize a single word: loan -> Loan
export const capitalize = (s: string): string => s && s[0].toUpperCase() + s.slice(1);

// camel case a dashed variable: loaned-tests -> loanedTests
export const camelCase = (variable: string) => {
  // early exist if function was not given a string
  if (!variable) return false;

  // spit the words based on dashes: loaned-tests -> ['loaned', 'tests']
  const words = variable.split('-');

  // format the string passed in
  return words.reduce((store, word: string, i: number): string => {
    // titlecase every subsequent word in words array
    if (i !== 0) return store + capitalize(word);
    console.log('h');
    return store;
  }, '');
};
