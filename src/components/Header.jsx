import { useNavigate } from "react-router";
import { useState } from "react";


export default function Header() {
  const navigate = useNavigate();
  const [addRecipeButton,setAddRecipeButton] = useState(true)

  function handleClick(){
   
    setAddRecipeButton(!addRecipeButton)
    addRecipeButton ? navigate('/addrecipe'): navigate('/')
  }

  return (
    <div className="flex flex-row justify-between mx-[25%] my-[2%]">
      <h1 className="text-3xl font-bold underline"><button onClick={()=>navigate('/')}>Recipe Book</button></h1>
      <button
        onClick={handleClick}
        className="font-bold border-solid border-2 border-black-500 rounded-full px-10 py-2 bg-gray-100"
      >
        {addRecipeButton ? 'Add Recipe' : 'Show Recipe'}
      </button>
    </div>
  );
}
