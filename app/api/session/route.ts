import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      process.env.API_URL + "/session/create",
      body,
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error("Ping failed:", err);
    return new Response("Error contacting backend", { status: 500 });
  }
}
