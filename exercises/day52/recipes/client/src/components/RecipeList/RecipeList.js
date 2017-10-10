import React from "react";
import { RecipeListItem } from "./RecipeListItem";

// RecipeList renders a bootstrap list item
export const RecipeList = props =>
    <ul className="list-group">
        {
            props.recipes.map((r, index) =>
                <RecipeListItem recipe={r} key={index}/>
            )
        }
    </ul>;