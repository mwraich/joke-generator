'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';

export default function JokeGenerator() {
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [topic, setTopic] = useState('animals');
	const [tone, setTone] = useState('sarcastic');
	const [randomness, setRandomness] = useState('medium');
	const [length, setLength] = useState('short');
	const [audience, setAudience] = useState('adults');

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		append,
	} = useChat();

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const generateJokePrompt = () => {
		return `Tell me a ${tone} joke about ${topic} that is ${randomness} random and ${length} in length for ${audience}.`;
	};
	return (
		<div className="flex flex-col h-screen w-full max-w-md py-24 mx-auto stretch">
			<h1 className="text-center mb-6 text-2xl font-bold">Joke Generator</h1>

			<div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
				{messages.map((m) => (
					<div
						key={m.id}
						className={`whitespace-pre-wrap ${
							m.role === 'user'
								? 'bg-green-700 p-3 m-2 rounded-lg'
								: 'bg-slate-700 p-3 m-2 rounded-lg'
						}`}
					>
						{m.role === 'user' ? 'User ' : 'AI '}
						{m.content}
					</div>
				))}
				{isLoading && (
					<div className="flex justify-end pr-4">
						<span className="animate-bounce">...</span>
					</div>
				)}
			</div>

			<div className="space-y-4">
				<div className="flex flex-col">
					<label className="mb-2 font-medium">Topic:</label>
					<select
						className="p-2 border border-gray-300 rounded shadow-sm text-black"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					>
						<option value="animals">Animals</option>
						<option value="technology">Technology</option>
						<option value="relationships">Relationships</option>
						<option value="sports">Sports</option>
						<option value="food">Food</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label className="mb-2 font-medium">Tone:</label>
					<select
						className="p-2 border border-gray-300 rounded shadow-sm text-black"
						value={tone}
						onChange={(e) => setTone(e.target.value)}
					>
						<option value="sarcastic">Sarcastic</option>
						<option value="dark">Dark</option>
						<option value="clean">Clean</option>
						<option value="corny">Corny</option>
						<option value="witty">Witty</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label className="mb-2 font-medium">Randomness:</label>
					<select
						className="p-2 border border-gray-300 rounded shadow-sm bg-white text-black"
						value={randomness}
						onChange={(e) => setRandomness(e.target.value)}
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label className="mb-2 font-medium">Length:</label>
					<select
						className="p-2 border border-gray-300 rounded shadow-sm bg-white text-black"
						value={length}
						onChange={(e) => setLength(e.target.value)}
					>
						<option value="short">Short</option>
						<option value="medium">Medium</option>
						<option value="long">Long</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label className="mb-2 font-medium">Audience:</label>
					<select
						className="p-2 border border-gray-300 rounded shadow-sm bg-white text-black"
						value={audience}
						onChange={(e) => setAudience(e.target.value)}
					>
						<option value="kids">Kids</option>
						<option value="adults">Adults</option>
						<option value="professionals">Professionals</option>
					</select>
				</div>
			</div>
			<div className="fixed bottom-0 w-full max-w-md">
				<div className="flex flex-col justify-center mb-2 items-center">
					<button
						className="bg-blue-500 p-2 text-white rounded shadow-xl"
						disabled={isLoading}
						onClick={() =>
							append({ role: 'user', content: generateJokePrompt() })
						}
					>
						Generate a joke
					</button>
				</div>
			</div>
		</div>
	);
}
