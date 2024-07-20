import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ingredientArray, setIngredientArray] = useState([]);
  const [instructionsArray, setInstructionsArray] = useState([]);

  async function handleSubmit() {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("recipe_image", selectedFile);
    formData.append("recipe_description", recipeDescription);
    formData.append("recipe_name", recipeName);
    formData.append("ingredients", JSON.stringify(ingredientArray));
    formData.append("preparation_time", preparationTime);
    formData.append("instruction", JSON.stringify(instructionsArray));

    try {
      const postData = await axios.post(
        "http://localhost:8000/recipes/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(postData);
    } catch (e) {
      console.error("error uploading the file: ",e);
    }
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleAddText = (e) => {
    e.preventDefault();
    if (ingredients.trim() !== "") {
      setIngredientArray([...ingredientArray, ingredients]);
      setIngredients("");
    }
  };

  const handleInstructionClick = (e) => {
    e.preventDefault();
    if (instructions.trim() !== "") {
      setInstructionsArray([...instructionsArray, instructions]);
      setInstructions("");
    }
  };

  return (
    <div className="mx-[25%]">
      <h2 className="font-bold underline text-xl pb-[20px]">Add your Recipe</h2>
      <form className="flex flex-col space-y-[20px]" onSubmit={handleSubmit}>
        <input
          className="py-3 px-5 border-solid border-2 border-black-500 rounded-xl"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <textarea
          className="py-3 px-5 border-solid border-2 border-black-500 rounded-xl"
          placeholder="Recipe Description"
          value={recipeDescription}
          onChange={(e) => setRecipeDescription(e.target.value)}
        />
        <input
          className="py-3 px-5 border-solid border-2 border-black-500 rounded-xl"
          placeholder="Approximate Preparation time"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
        />
        <div className="flex flex-row justify-between">
          <input
            className="flex-1 mr-5 py-3 px-5 border-solid border-2 border-black-500 rounded-xl"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button onClick={handleAddText}>
            <PlusCircleIcon className="flex-none size-10  text-blue-500" />
          </button>
        </div>
        <div>
          {ingredientArray &&
            ingredientArray.map((text, index) => <li key={index}>{text}</li>)}
        </div>
        <div className="flex flex-row justify-between">
          <input
            className=" flex-1 mr-5 py-3 px-5 border-solid border-2 border-black-500 rounded-xl"
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <button>
            <PlusCircleIcon
              className="flex-none size-10  text-blue-500"
              onClick={handleInstructionClick}
            />
          </button>
        </div>
        <div>
          {instructionsArray &&
            instructionsArray.map((text, index) => <li key={index}>{text}</li>)}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="font-bold border-solid border-2 border-black-500 rounded-xl py-2 px-5"
        />
        {preview && (
          <img src={preview} alt="Preview" width="100" height="100" />
        )}
        <button className="w-[200px] font-bold border-solid border-2 border-black-500 rounded-full py-2 bg-gray-100">
          Add!!
        </button>
      </form>
    </div>
  );
}
