import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ChatOpenAI,OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

 export async function POST(request){
  try {
    const body = await request.formData();
    const file = body.get('file')
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-1106",
      temperature: 0.7,
    });
    const loader = new PDFLoader(file)
    const docs = await loader.load()
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
    const vectorStore = await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings(),
      {
        client,
        tableName:'documents',
        queryName:'match_documents'
      }
    )
    return NextResponse.json({message:'embedding done'},{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 });
  }
 }

