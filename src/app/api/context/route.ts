import { NextResponse } from "next/server";
import { ContextOptions, getContext } from "@/utils/context";
import { ScoredVector } from "@pinecone-database/pinecone";

export async function POST(req: Request) {
  try {
    const { messages, options } = await req.json()
    const lastMessage = messages.length > 1 ? messages[messages.length - 1] : messages[0]
    const opt: ContextOptions = {
      getOnlyText: options && options.getOnlyText || false,
      minScore: options && options.minScore || 0.7,
      maxTokens: options && options.maxTokens || 10000,
      numChunks: options && options.numChunks || 3,
      namespace: options && options.namespace || '',
    };    
    const context = await getContext(lastMessage.content, opt) as ScoredVector[]
    return NextResponse.json({ context })
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}