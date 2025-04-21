const storeList = (key: string, list: object[]): void => {
  const jsonString = JSON.stringify(list);
  localStorage.setItem(key, jsonString);
};

const retrieveList = (key: string): string[] => {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString);
  }
  return [];
};

export { storeList, retrieveList };