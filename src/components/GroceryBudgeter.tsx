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
  DollarSign,
  PlusCircle,
  Trash2,
  Sparkles,
  Loader2,
  Info,
  AlertTriangle,
} from 'lucide-react';
import {
  budgetAwareList,
  type BudgetAwareListOutput,
} from '@/ai/flows/budget-aware-list';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  budget: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(1, { message: 'Budget must be at least $1.' }),
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
  const [result, setResult] = useState<BudgetAwareListOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 100,
      items: [
        { name: 'Organic Bananas', quantity: 1 },
        { name: 'Whole Milk (Gallon)', quantity: 1 },
        { name: 'Avocados', quantity: 4 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const output = await budgetAwareList(values);
      setResult(output);
    } catch (e) {
      console.error(e);
      setError(
        'An error occurred while analyzing your list. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="text-primary" />
          AI Budget Assistant
        </CardTitle>
        <CardDescription>
          Enter your shopping list and budget to get an estimated cost and
          identify expensive items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Your Budget
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="100"
                        className="pl-10 text-lg"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <FormLabel className="text-lg font-semibold">
                Grocery Items
              </FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2 md:gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g., Avocados" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-24">
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
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
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
              disabled={isLoading}
              className="w-full text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                </>
              ) : (
                'Analyze My List'
              )}
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-8 space-y-4 pt-8 border-t">
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <p className="text-center text-muted-foreground">
              AI is crunching the numbers...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-destructive p-4 bg-destructive/10 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 pt-8 border-t">
            <h3 className="text-xl font-bold text-center">
              Budget Analysis Complete
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className={cn(
                  'border-2',
                  result.withinBudget
                    ? 'bg-primary/10 border-primary'
                    : 'bg-destructive/10 border-destructive'
                )}
              >
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Budget Status
                  </CardTitle>
                  {result.withinBudget ? (
                    <Info className="h-4 w-4 text-primary" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${result.estimatedTotalCost.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    out of ${form.getValues('budget').toFixed(2)} budget
                  </p>
                  <Progress
                    value={
                      (result.estimatedTotalCost / form.getValues('budget')) *
                      100
                    }
                    className="mt-4"
                    indicatorClassName={
                      result.withinBudget ? 'bg-primary' : 'bg-destructive'
                    }
                  />
                  <p
                    className={cn(
                      'mt-2 text-sm font-semibold',
                      result.withinBudget ? 'text-primary' : 'text-destructive'
                    )}
                  >
                    {result.withinBudget
                      ? `You're within budget! You have $${(
                          form.getValues('budget') - result.estimatedTotalCost
                        ).toFixed(2)} left.`
                      : `You're over budget by $${(
                          result.estimatedTotalCost - form.getValues('budget')
                        ).toFixed(2)}.`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">
                    Pricey Picks
                  </CardTitle>
                  <CardDescription>
                    Items flagged as expensive by the AI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.expensiveItems.length > 0 ? (
                    <ul className="space-y-2">
                      {result.expensiveItems.map((item) => (
                        <li
                          key={item.name}
                          className="flex justify-between items-center"
                        >
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="destructive">
                            ${item.estimatedPrice.toFixed(2)}
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

declare module 'react' {
    interface ComponentProps<T> {
        indicatorClassName?: string;
    }
}
