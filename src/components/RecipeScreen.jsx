import Recipe from "./Recipe";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function RecipeScreen() {
  const [activeRecipe, setActiveRecipe] = useState(0);

  function leftCLickHandler(){
    if(activeRecipe>0) setActiveRecipe(activeRecipe - 1);
    console.log(activeRecipe);
  }

  function rightCLickHandler(){
    if(activeRecipe) setActiveRecipe(activeRecipe + 1);
    console.log(activeRecipe);
  }
   
  return (
    <div className="flex flex-row mx-[10%] mb-[10%]">
      <button
        className="flex-none justify-center hover:text-blue-700"
        onClick={leftCLickHandler}
      >
        <ArrowLeftCircleIcon className="flex-none size-20  text-black-500" />
      </button>
      <div className="flex-1 mx-[10%]">
        <Recipe />
      </div>
      <button
        className="flex-none justify-center  hover:text-blue-700"
        onClick={rightCLickHandler}
      >
        <ArrowRightCircleIcon className="flex-none size-20  text-black-500" />
      </button>
    </div>
  );
}
