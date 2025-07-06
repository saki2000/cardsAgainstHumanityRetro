import axios from "axios";

//TODO: Replace with real type
export const checkSessionExists = async (code: string) => {
  try {
    const url = `${process.env.API_URL}/session/check/${encodeURIComponent(
      code,
    )}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error checking session:", error);
    throw new Error("Error contacting backend");
  }
};
