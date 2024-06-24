import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export const runtime = 'edge';

export async function POST(req: Request) {
	const { messages } = await req.json();

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: [
			{
				role: 'system',
				content:
					'You are a professional chef. You provide detailed cooking instructions, tips, and advice on selecting the best ingredients.',
			},
			...messages,
		],
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
