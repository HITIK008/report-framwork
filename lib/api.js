//import package axios for fetch api provided by company
import axios from "axios";

export const fetchData = async () => {
  const response = await axios.get(
    "https://run.mocky.io/v3/69f60a58-3a36-48c5-a9cf-b100b015950c"
  );
  const responseText = response.data;
  const match = responseText.match(/const\s+mockData\s*=\s*(\[.*?\]);/s);

  let mockData;
  if (match) {
    const jsonString = match[1];
    const parseMockData = new Function("return " + jsonString)();
    mockData = parseMockData;
  } else {
    console.error("fail response");
  }
  return mockData;
};
