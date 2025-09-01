'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  IndianRupee,
  PlusCircle,
  Trash2,
  Sparkles,
  Loader2,
  Info,
  AlertTriangle,
  ChefHat,
  Utensils,
} from 'lucide-react';
import {
  budgetAwareList,
  type BudgetAwareListOutput,
} from '@/ai/flows/budget-aware-list';
import {
  suggestRecipes,
  type RecipeSuggestionInput,
  type RecipeSuggestionOutput,
} from '@/ai/flows/recipe-suggestion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  budget: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(100, { message: 'Budget must be at least ₹100.' }),
  items: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Item name is required.' }),
        quantity: z.coerce
          .number({ invalid_type_error: 'Qty must be a number.' })
          .min(1, { message: 'Min 1.' }),
      })
    )
    .min(1, { message: 'Please add at least one item.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function GroceryBudgeter() {
  const [budgetResult, setBudgetResult] = useState<BudgetAwareListOutput | null>(null);
  const [recipeResult, setRecipeResult] = useState<RecipeSuggestionOutput | null>(null);
  const [isBudgetLoading, setIsBudgetLoading] = useState(false);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 5000,
      items: [
        { name: 'Basmati Rice (1kg)', quantity: 1 },
        { name: 'Whole Milk (1L)', quantity: 1 },
        { name: 'Onions (1kg)', quantity: 1 },
        { name: 'Chicken Breast (500g)', quantity: 1 },
        { name: 'Lentils (Toor Dal, 1kg)', quantity: 1 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  async function onBudgetSubmit(values: FormData) {
    setIsBudgetLoading(true);
    setBudgetResult(null);
    setRecipeResult(null);
    setError(null);
    try {
      const output = await budgetAwareList(values);
      setBudgetResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing your list. Please try again.');
    } finally {
      setIsBudgetLoading(false);
    }
  }

  async function onRecipeSubmit() {
    setIsRecipeLoading(true);
    setRecipeResult(null);
    setError(null);
    try {
      const items = form.getValues('items').map(item => item.name);
      const input: RecipeSuggestionInput = { items };
      const output = await suggestRecipes(input);
      setRecipeResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating recipes. Please try again.');
    } finally {
      setIsRecipeLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="text-primary" />
            AI Budget Assistant
          </CardTitle>
          <CardDescription>
            Enter your shopping list and budget for an AI-powered cost analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onBudgetSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Your Budget</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="5000"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel className="font-semibold">Grocery Items</FormLabel>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="e.g., Basmati Rice" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="w-20">
                            <FormControl>
                              <Input type="number" placeholder="Qty" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mt-1 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ name: '', quantity: 1 })}
                  className="w-full border-dashed"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                {form.formState.errors.items?.root && <FormMessage>{form.formState.errors.items.root.message}</FormMessage>}
              </div>

              <Button
                type="submit"
                disabled={isBudgetLoading}
                className="w-full text-base py-5"
              >
                {isBudgetLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Budget...
                  </>
                ) : (
                  'Analyze My List'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-8">
        {isBudgetLoading && (
          <Card className="shadow-lg animate-pulse">
            <CardHeader>
              <CardTitle>Crunching the numbers...</CardTitle>
              <CardDescription>AI is analyzing your budget.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-24 bg-muted rounded-md"></div>
              <div className="h-24 bg-muted rounded-md"></div>
            </CardContent>
          </Card>
        )}

        {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {budgetResult && (
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Budget Analysis</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <Card
                  className={cn(
                    'border-2',
                    budgetResult.withinBudget
                      ? 'bg-primary/5 border-primary/40'
                      : 'bg-destructive/5 border-destructive/40'
                  )}
                >
                  <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Budget Status
                    </CardTitle>
                    {budgetResult.withinBudget ? (
                      <Info className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ₹{budgetResult.estimatedTotalCost.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      out of ₹{form.getValues('budget').toFixed(2)} budget
                    </p>
                    <Progress
                      value={
                        (budgetResult.estimatedTotalCost / form.getValues('budget')) * 100
                      }
                      className="mt-4 h-2"
                      indicatorClassName={
                        budgetResult.withinBudget ? 'bg-primary' : 'bg-destructive'
                      }
                    />
                    <p
                      className={cn(
                        'mt-2 text-sm font-semibold',
                        budgetResult.withinBudget ? 'text-primary' : 'text-destructive'
                      )}
                    >
                      {budgetResult.withinBudget
                        ? `You're within budget! You have ₹${(
                            form.getValues('budget') - budgetResult.estimatedTotalCost
                          ).toFixed(2)} left.`
                        : `You're over budget by ₹${(
                            budgetResult.estimatedTotalCost - form.getValues('budget')
                          ).toFixed(2)}.`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium">Pricey Picks</CardTitle>
                    <CardDescription className="text-xs">
                      Items the AI flagged as potentially expensive.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {budgetResult.expensiveItems.length > 0 ? (
                      <ul className="space-y-2">
                        {budgetResult.expensiveItems.map((item) => (
                          <li
                            key={item.name}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="font-medium">{item.name}</span>
                            <Badge variant="destructive">
                              ₹{item.estimatedPrice.toFixed(2)}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No particularly expensive items found. Good job!
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            
            {!recipeResult && (
              <Button onClick={onRecipeSubmit} disabled={isRecipeLoading} className="w-full text-base py-5">
                {isRecipeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Thinking of recipes...
                  </>
                ) : (
                  <>
                    <ChefHat className="mr-2 h-5 w-5" /> Get Recipe Ideas
                  </>
                )}
              </Button>
            )}

            {isRecipeLoading && (
              <Card className="shadow-lg animate-pulse">
                <CardHeader>
                  <CardTitle>Whipping up some ideas...</CardTitle>
                  <CardDescription>AI is finding tasty recipes for your items.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-12 bg-muted rounded-md"></div>
                    <div className="h-12 bg-muted rounded-md"></div>
                    <div className="h-12 bg-muted rounded-md"></div>
                </CardContent>
              </Card>
            )}

            {recipeResult && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="text-accent" />
                    Recipe Suggestions
                  </CardTitle>
                  <CardDescription>
                    Here are some recipes you can make with the items on your list.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recipeResult.recipes.map((recipe) => (
                    <Card key={recipe.title} className="bg-background">
                      <CardHeader>
                        <CardTitle className="text-lg">{recipe.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{recipe.description}</p>
                        <div className="text-sm">
                          <h4 className="font-semibold mb-2">Ingredients Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {recipe.ingredientsUsed.map((ing) => (
                              <Badge key={ing} variant="secondary">{ing}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}

declare module 'react' {
    interface ComponentProps<T> {
        indicatorClassName?: string;
    }
}
