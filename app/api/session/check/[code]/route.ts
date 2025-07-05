import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { code: string } },
) {
  try {
    const { code } = params;
    const url = `${process.env.API_URL}/session/check/${encodeURIComponent(code)}`;

    const response = await axios.get(url);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error contacting backend", { status: 500 });
  }
}
