import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function main(){
    const completion = await openai.chat.completions.create({
        messages:[{
                role:"system",
                content:"You are a helpful assistant designed to output JSON"
            },
            {
                role:"user",
                content:"give me a list of the presidents of Singapore"
            }
        ],
        model:'gpt-3.5-turbo-1106',
        response_format:{type: 'json_object'}
    })
    const myData = completion.choices[0].message.content
    return myData
}

export async function GET(){
    const res = await main()
    return NextResponse.json({res})
}

export async function POST(req){
    const body = await req.json()
    const message = body.messages
    const res = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
            {
                role:"system",
                content:"You are Kobe Bryant"
            },
            {
                role:"user",
                content:message
            }
        ],
        temperature:0.7
    })

    const data = res.choices[0].message.content
    return Response.json({data})

}

// export async function GET(){
//     const res = await fetch('https://cat-fact.herokuapp.com/facts',{
//         headers:{
//             'Content-Type': 'application/json',
//         }
//     })
//     const catFact = await res.json()
//     return Response.json({catFact})
// }






