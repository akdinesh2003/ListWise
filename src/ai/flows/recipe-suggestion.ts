'use server';
/**
 * @fileOverview A Genkit flow for suggesting recipes based on a list of ingredients.
 *
 * - suggestRecipes - A function that suggests recipes.
 * - RecipeSuggestionInput - The input type for the suggestRecipes function.
 * - RecipeSuggestionOutput - The return type for the suggestRecipes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecipeSuggestionInputSchema = z.object({
  items: z.array(z.string()).describe('A list of grocery items available.'),
});
export type RecipeSuggestionInput = z.infer<typeof RecipeSuggestionInputSchema>;

const RecipeSuggestionOutputSchema = z.object({
  recipes: z.array(
    z.object({
      title: z.string().describe('The title of the suggested recipe.'),
      description: z.string().describe('A brief description of the recipe.'),
      ingredientsUsed: z.array(z.string()).describe('List of ingredients from the input that are used in this recipe.'),
    })
  ).describe('A list of 2-3 recipe suggestions.'),
});
export type RecipeSuggestionOutput = z.infer<typeof RecipeSuggestionOutputSchema>;

export async function suggestRecipes(
  input: RecipeSuggestionInput
): Promise<RecipeSuggestionOutput> {
  return suggestRecipesFlow(input);
}

const suggestRecipesPrompt = ai.definePrompt({
  name: 'suggestRecipesPrompt',
  input: { schema: RecipeSuggestionInputSchema },
  output: { schema: RecipeSuggestionOutputSchema },
  prompt: `You are a creative chef who suggests simple and delicious recipes.
Based on the following list of available grocery items, suggest 2-3 recipes.
For each recipe, provide a title, a short description, and a list of which of the *provided ingredients* are used in the recipe.

Available items:
{{#each items}}
- {{this}}
{{/each}}
`,
});

const suggestRecipesFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFlow',
    inputSchema: RecipeSuggestionInputSchema,
    outputSchema: RecipeSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await suggestRecipesPrompt(input);
    return output!;
  }
);
