import { useState } from "react"

const ImageGenerator = () => {

    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {

        if (!prompt.trim()) return;

        setLoading(true);
        setImageUrl('');

        try{

            const response = await fetch(`http://localhost:8080/api/generate-image?prompt=${encodeURIComponent(prompt)}`)
            const data = await response.json();
            setImageUrl(`http://localhost:8080${data.imageUrl}`);

        } catch(error) {

            console.log('Error Generating Image : ', error)
            alert("Something went wrong while generating the image.");

        } finally {

            setLoading(false);

        }

    }

    return (
      <>
        <div className="flex-col">
            <div className="flex justify-center">
              <h2 className='font-bold text-3xl py-3 text-white w-full text-center bg-stone-400 rounded-lg'>Image Generator</h2>
            </div>
            <div className="flex pt-1 gap-1">
                <input className="bg-white rounded-lg pr-15 py-2 w-full" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt to generate Image"/>
                <button className="px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold text-white" 
                onClick={generateImage} 
                disabled={loading}>{loading ? 'Generating Image...' : 'Generate Image'}</button>
            </div>
            <div className="mx-auto mt-5 h-128 w-128 border-2 border-dashed border-stone-400 rounded-lg">
                {loading ? (
                    <p className="text-stone-500 text-center">Generating Image...</p>
                ) : imageUrl ? (
                    <img src={imageUrl} alt="Generated" className="h-full w-full object-contain rounded" />
                ) : (
                    <p className="text-white text-center">Your Image will appear here</p>
                )}
            </div>
        </div>
      </>
    )
}

export default ImageGenerator;
