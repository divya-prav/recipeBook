import { useState, useEffect } from "react";

export default function Recipe(props) {
  const [recipe, setRecipe] = useState(null);
  let getRecipe = props.activeRecipe;
  console.log(getRecipe)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://localhost:8000/recipes/");
        const res = await result.json();
        console.log(res);
        setRecipe(res);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-[5%]">
      {recipe && (
        <>
          <div>
            {recipe[getRecipe].recipe_image && 
            <img
              src={`http://localhost:8000/${recipe[getRecipe].recipe_image}`}
              alt="Omelette-image"
              className="w-[800px] h-[400px] p-2"
            />}
          </div>
          <hr className="my-5" />
          <div>
            <h2 className="font-bold underline p-3">{recipe[getRecipe].recipe_name}</h2>
            <p className="px-5">{recipe[getRecipe].recipe_description}</p>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="font-bold underline p-3">Preparation time</h4>
            <p className="px-5">{recipe[getRecipe].preparation_time}</p>
          </div>
          <hr className="my-5" />
          <div>
            <h3 className="font-bold underline p-3">Ingredients</h3>
            <ul className="px-10 list-disc leading-loose">
              {recipe[getRecipe].ingredients && recipe[getRecipe].ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="my-5" />
          <div>
            <h2 className="font-bold underline p-3"> Instructions</h2>
            <ol className="px-10 list-decimal leading-loose">
              {recipe[getRecipe].instruction && recipe[getRecipe].instruction.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
