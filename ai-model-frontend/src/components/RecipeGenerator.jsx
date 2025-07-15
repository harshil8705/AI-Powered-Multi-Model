import { useState } from "react"

const RecipeGenerator = () => {

    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setcuisine] = useState('');
    const [dietRestrictions, setDietRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');

    const generateRecipe = async () => {

        if(!ingredients.trim()) return;

        setLoading(true);
        setIngredients('');
        setcuisine('');
        setDietRestrictions('');
        setRecipe('');

        try {

            const response = await fetch(`http://localhost:8080/api/generate-recipe?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&dietRestrictions=${encodeURIComponent(dietRestrictions)}`)
            const data = await response.json();
            setRecipe(data.generatedRecipe);

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
                <h2 className="font-bold text-3xl py-3 text-white w-full text-center bg-stone-400 rounded-lg">Recipe Generator</h2>
                </div>
                <div className="flex pt-1 gap-1">
                    <input className="bg-white rounded-lg pr-15 py-2 w-full" type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Enter your ingredients"/>
                    <input className="bg-white rounded-lg pr-15 py-2 w-full" type="text" value={cuisine} onChange={(e) => setcuisine(e.target.value)} placeholder="Enter your cuisine"/>
                    <input className="bg-white rounded-lg pr-15 py-2 w-full" type="text" value={dietRestrictions} onChange={(e) => setDietRestrictions(e.target.value)} placeholder="Enter your diet restrictions"/>
                    <button className="px-3 py-1.5 bg-purple-900 rounded-lg hover:bg-purple-500 text-xl font-semibold text-white" 
                    onClick={generateRecipe}
                    disabled={loading}>{loading ? 'Generating Recipe...' : 'Ask AI'}</button>
                </div>
                <div className="w-full bg-stone-400 rounded-lg mt-1">
                    {loading ? (
                        <p className="text-white text-center">Generating Recipe...</p>
                    ) : recipe ? (
                        <p className="text-white">{recipe}</p>
                    ) : (
                        <p className="text-white text-center">Your Recipe will appear Here.</p>
                    )}
                </div>
            </div>
        </>
    )

}

export default RecipeGenerator;