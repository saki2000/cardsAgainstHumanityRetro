import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("Body:", body);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/session/create`,
      body,
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error contacting backend", { status: 500 });
  }
}
