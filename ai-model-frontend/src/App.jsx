import { useState } from 'react'
import './App.css'
import ImageGenerator from './components/ImageGenerator';
import AiChatAssistant from './components/AiChatAssistant';
import RecipeGenerator from './components/RecipeGenerator';

function App() {

  const [activeTab, setActiveTab] = useState('image-generator');

  const handleChange = (tab) => {

    // alert(tab);
    setActiveTab(tab);

  };

  return (
    <>
      <div className='flex gap-1 justify-center p-1'>
        <button onClick={() => handleChange('image-generator')} className='text-white px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold' >Image Generator</button>
        <button onClick={() => handleChange('ai-chat-assistant')} className='text-white px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold' >AI Chat Assitant</button>
        <button onClick={() => handleChange('recipe-generator')} className='text-white px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold' >Recipe Generator</button>
      </div>
      <div>
        {activeTab === 'image-generator' && <ImageGenerator />}
        {activeTab === 'ai-chat-assistant' && <AiChatAssistant />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>
    </>
  )

}

export default App
