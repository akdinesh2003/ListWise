import GroceryBudgeter from '@/components/GroceryBudgeter';

export default function Home() {
  return (
    <div className="container mx-auto px-0">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Smart Grocery, Smarter Budget
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your smart cart companion. Estimate costs and stay on budget with AI-powered insights.
        </p>
      </div>
      <GroceryBudgeter />
    </div>
  );
}
