import Recipe from "./components/Recipe";
import Header from "./components/Header";
import './index.css';
import { Routes,Route } from "react-router";
import AddRecipe from "./components/AddRecipe";
import RecipeScreen from "./components/RecipeScreen";

function App() {
  return (
    <div >
      <Header/>
      <Routes>
        <Route path="/" element={<RecipeScreen/>}/>
        <Route path="/addrecipe" element={<AddRecipe/>}/>
      </Routes>
    </div>
  );
}

export default App;
