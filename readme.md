# EMILKCAL
<p>
This is a silly node script that calculates amount of calories for a given combination of
ingredients.
"Recipes" is stored as a json file in root/recipes folder (check out the examples) with a simple structure that only needs
the amount of the ingredient, the weight in grams and and the kcal per 100g for the given ingredient.
</p>
Usage:
    
    $ npm install
    $ npm start fusk_bea 80
    > Total kcal for 80 g of fusk_bea is: 105

First arg is the name value in the recipe json-file, and second arg is the total weighed amount of the complete dish.

This is probably not useful if you want to calculate total calories of a plate of food, but if you make say a Bolognese Sauce
and want to now how much 200 grams of said sauce is without to blow your head up with a calculator feel free to use this shit.

Structure of recipes:
```
{
    name: string;
    ingredients: [
        {
            name: string;
            weight: number;
            kcal_per_100: number;
        }
    ]
}
```
