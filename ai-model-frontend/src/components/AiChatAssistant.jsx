import { useState } from "react";

const AiChatAssistant = () => {

    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const generateResponse = async () => {

        if(!prompt.trim()) return;

        setLoading(true);
        setResponse('');

        try {

            const response = await fetch(`http://localhost:8080/api/ask-ai?prompt=${encodeURIComponent(prompt)}`)
            const data = await response.json();
            setResponse(data.response);

        } catch (error) {

            console.log('Error generating Response : ', error);
            alert('Something went wrong while generating the Response.');

        } finally {

            setLoading(false);

        }

    };

    return(
        <>
            <div className="flex-col">
                <div className="flex justify-center">
                <h2 className="font-bold text-3xl py-3 text-white w-full text-center bg-stone-400 rounded-lg">AI Chat Assistant</h2>
                </div>
                <div className="flex pt-1 gap-1">
                    <input className="bg-white rounded-lg pr-15 py-2 w-full" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt to ask AI"/>
                    <button className="px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold text-white" 
                    onClick={generateResponse} 
                    disabled={loading}>{loading ? 'Generating Response...' : 'Ask AI'}</button>
                </div>
                <div className="w-full bg-stone-400 rounded-lg mt-1">
                    {loading ? (
                        <p className="text-white text-center">Generating Text...</p>
                    ) : response ? (
                        <p className="text-white">{response}</p>
                    ) : (
                        <p className="text-white text-center">Your Response will appear Here.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AiChatAssistant;