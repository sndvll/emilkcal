import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';

const args: string[] = process.argv.slice(2);
const weight: number = Number(args[1]);
const recipeName: String = args[0];

const totalKcalForPortion = calculate(getAllRecipes().find(recipe => recipe.name === recipeName));

console.log(`Total kcal for ${weight} g of ${recipeName} is: ${totalKcalForPortion}`);

/**
 * function calculate
 * Calculates the amount of calories for a given weight of the selected recipe
 * @param recipe
 */
function calculate(recipe: Recipe): number {
    const totalRecipeKcal = recipe.ingredients.reduce((prev: number, curr: Ingredient) => {
        const currTotal = calculateIngredientKcal(curr);
        return prev + currTotal;
    }, 0);
    const totalRecipeWeight = recipe.ingredients.reduce((prev, curr) => {
        return prev + curr.weight;
    }, 0)
    return Math.round((totalRecipeKcal / totalRecipeWeight) * weight);
}

/**
 * function getAllRecipes
 * reads the files in the recipes folder and returns an array with all
 * available recipes parsed and ready to be used.
 */
function getAllRecipes() {
    const scriptPath = fileURLToPath(import.meta.url);
    const dirname = path.dirname(scriptPath);
    const recipesDir = path.dirname(dirname) +  '/recipes';
    const fileNames = fs.readdirSync(recipesDir).filter(filename => filename.substring(filename.length - 4, filename.length) === 'json');
    return fileNames.map(filename =>  JSON.parse(fs.readFileSync(`${recipesDir}/${filename}`, 'utf8')));
}

function calculateIngredientKcal(ingredient: Ingredient): number {
    return (ingredient.kcal_per_100 / 100) * ingredient.weight;
}

export type Recipe = {
    name: string;
    ingredients: Ingredient[]
}

export type Ingredient = {
    name: string;
    weight: number;
    kcal_per_100: number;
}