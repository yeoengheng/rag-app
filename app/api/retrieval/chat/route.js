import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ChatOpenAI,OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

export async function POST(req){
    try {
        const data = await req.text()
        const model = new ChatOpenAI({
            modelName: "gpt-3.5-turbo-1106",
            temperature: 0.7,
          });
          const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
          const vectorStore = await SupabaseVectorStore.fromTexts(
            data,
            new OpenAIEmbeddings(),
            {
              client,
              tableName:'documents',
              queryName:'match_documents'
            }
          )

        
    } catch (error) {
        
    }

    return NextResponse.json({message:data},{status:200})
}