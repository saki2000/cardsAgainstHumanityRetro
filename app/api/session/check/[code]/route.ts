import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, context: any) {
  try {
    const { code } = context.params;
    const url = `${process.env.API_URL}/session/check/${encodeURIComponent(
      code,
    )}`;

    const response = await axios.get(url);
    debugger;
    console.log("Session check response:", response);
    return NextResponse.json(response.data);
  } catch (err: unknown) {
    debugger;
    console.error("Error checking session:", err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (err as any)?.response?.status || 500;
    return NextResponse.json(
      //TODO: manage errors better when got types
      { message: "Error contacting backend" },
      { status },
    );
  }
}
