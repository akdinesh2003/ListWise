'use server';

/**
 * @fileOverview This file implements the Genkit flow for the BudgetAwareList story.
 *
 * - budgetAwareList - A function that estimates the total cost of a shopping list and highlights expensive items.
 * - BudgetAwareListInput - The input type for the budgetAwareList function.
 * - BudgetAwareListOutput - The return type for the budgetAwareList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetAwareListInputSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().describe('The name of the grocery item.'),
        quantity: z.number().describe('The quantity of the item.'),
      })
    )
    .describe('A list of grocery items with their quantities.'),
  budget: z.number().describe('The user’s budget for the shopping list.'),
});

export type BudgetAwareListInput = z.infer<typeof BudgetAwareListInputSchema>;

const BudgetAwareListOutputSchema = z.object({
  estimatedTotalCost: z.number().describe('The estimated total cost of the shopping list.'),
  expensiveItems: z
    .array(
      z.object({
        name: z.string().describe('The name of the expensive grocery item.'),
        estimatedPrice: z.number().describe('The estimated price of the item.'),
      })
    )
    .describe('A list of expensive items that exceed a certain threshold.'),
  withinBudget: z.boolean().describe('Whether the estimated total cost is within the budget.'),
});

export type BudgetAwareListOutput = z.infer<typeof BudgetAwareListOutputSchema>;

const getItemPrice = ai.defineTool(
  {
    name: 'getItemPrice',
    description: 'Returns the current market price of a grocery item.',
    inputSchema: z.object({
      itemName: z.string().describe('The name of the grocery item.'),
    }),
    outputSchema: z.number().describe('The price of the item.'),
  },
  async input => {
    // TODO: Implement the logic to fetch the item price from an external source.
    // This is a placeholder implementation that returns a random price.
    // Replace this with a real implementation that fetches the price from an API or database.
    return Math.random() * 5 + 1; // Returns a random price between $1 and $6.
  }
);

const budgetAwareListPrompt = ai.definePrompt({
  name: 'budgetAwareListPrompt',
  tools: [getItemPrice],
  input: {schema: BudgetAwareListInputSchema},
  output: {schema: BudgetAwareListOutputSchema},
  prompt: `You are a helpful shopping assistant that estimates the total cost of a shopping list and highlights expensive items.

  The user has a budget of \${{budget}}. Here is the list of items:
  {{#each items}}
  - {{quantity}} x {{name}}
  {{/each}}

  Estimate the price of each item using the getItemPrice tool.  If any items are more than 20% of the total budget, include them in the expensiveItems array.  Make sure to include the item name and price in the array.
  Finally, determine whether the estimated total cost is within the budget and set the withinBudget field accordingly.
  `,
});

const budgetAwareListFlow = ai.defineFlow(
  {
    name: 'budgetAwareListFlow',
    inputSchema: BudgetAwareListInputSchema,
    outputSchema: BudgetAwareListOutputSchema,
  },
  async input => {
    const {output} = await budgetAwareListPrompt(input);
    return output!;
  }
);

export async function budgetAwareList(input: BudgetAwareListInput): Promise<BudgetAwareListOutput> {
  return budgetAwareListFlow(input);
}
