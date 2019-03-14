export const sleep = (milliseconds: number): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

// get a query fragment from the url
export const getQueryString = (fragment: string): string => {
  // extract url params into an array
  const urlParams = new URLSearchParams(window.location.search);
  // extract the requested parameter from the array
  const [param] = urlParams.getAll(fragment);
  return param;
};
