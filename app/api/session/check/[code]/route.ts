import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse } from "@/app/types/customTypes";

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
) {
  try {
    const { code } = context.params;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/session/check/${encodeURIComponent(code)}`;

    const response = await axios.get(url);
    console.log("Session check response:", response.data);
    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Error checking session:", err);

    let errorData: ErrorResponse = {
      error: "Error contacting backend",
      path: "",
      timestamp: new Date().toISOString(),
      details: {},
    };
    let status = 500;

    if (axios.isAxiosError(err) && err.response) {
      status = err.response.status || 500;
      if (err.response.data) {
        errorData = err.response.data;
      }
      errorData.path = err.config?.url || "";
    }

    return NextResponse.json(errorData, { status });
  }
}
