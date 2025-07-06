import axios from "axios";

export async function POST(request: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("NEXT_PUBLIC_API_URL:", apiUrl); // Debugging line to check the API_URL

  if (!apiUrl) {
    // This will give you a clear error in your server logs if the variable is missing.
    console.error(
      "FATAL: NEXT_PUBLIC_API_URL environment variable is not set.",
    );
    throw new Error("Server is not configured correctly.");
  } //TODO: Remove later if not needed

  try {
    const body = await request.json();
    const response = await axios.post(`${apiUrl}/session/create`, body);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error contacting backend", { status: 500 });
  }
}
