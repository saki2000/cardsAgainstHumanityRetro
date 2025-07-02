import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "http://retro-game-backend-env.eba-vpzxmmua.eu-west-2.elasticbeanstalk.com/session/ping",
    );
    return new Response(response.data, { status: 200 });
  } catch (err) {
    console.error("Ping failed:", err);
    return new Response("Error contacting backend", { status: 500 });
  }
}
