import { NextResponse } from "next/server";
import { getContext } from "@/utils/context";
import { ScoredVector } from "@pinecone-database/pinecone";

export async function POST(req: Request) {
  try {
    const { messages, options } = await req.json()
    const lastMessage = messages.length > 1 ? messages[messages.length - 1] : messages[0]
    const context = await getContext(lastMessage.content, options) as ScoredVector[]
    return NextResponse.json({ context })
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}