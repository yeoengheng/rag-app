import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import { ChatOpenAI,OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";

export async function POST(req){
    try {
        const data = await req.text()
        const model = new ChatOpenAI({
            modelName: "gpt-3.5-turbo-1106",
            temperature: 0.7,
          });

        const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_PUBLIC_KEY)
        const retriever = new SupabaseHybridSearch(
          new OpenAIEmbeddings(),
          {
            client,
            similarityK: 2,
            keywordK: 2, 
            tableName:"documents",
            similarityQueryName:"match_documents",
            keywordQueryName:"kw_match_documents",
          }
          )
        const addContext = await retriever.getRelevantDocuments(data)

        const systemTemplate = "You are a Chinese Zodiac Fortune Teller."
        const humanTemplate = `
        Answer the user's question with some helpful context. Break down the context given.
          <user>
              {data}
          </user> 
          <context> 
              {addContext}
          </context>
          `
        const chatPrompt = ChatPromptTemplate.fromMessages([
          ["system", systemTemplate],
          ["human", humanTemplate],
        ]);
        const outputParser = new StringOutputParser()
        const chain = chatPrompt.pipe(model).pipe(outputParser)
        const results = await chain.invoke({
          data:data,
          addContext:addContext
        })

        return NextResponse.json({message:results},{status:200})
    } 
    catch (error) {
      console.log(error)
      return NextResponse.json({error:error},{status:500})
    }
}