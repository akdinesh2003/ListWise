import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

const sampleRecipes = [
  {
    title: "Chicken Curry",
    description: "A classic and flavorful chicken curry, perfect for a weeknight dinner.",
    imageUrl: "https://picsum.photos/400/250",
    dataAiHint: "chicken curry",
    tags: ["Dinner", "Chicken", "Indian"],
  },
  {
    title: "Dal Fry",
    description: "A simple and comforting lentil dish, tempered with spices.",
    imageUrl: "https://picsum.photos/400/251",
    dataAiHint: "dal fry",
    tags: ["Vegetarian", "Lentils", "Quick"],
  },
  {
    title: "Paneer Butter Masala",
    description: "A rich and creamy dish of paneer (Indian cheese) in a tomato-based gravy.",
    imageUrl: "https://picsum.photos/400/252",
    dataAiHint: "paneer masala",
    tags: ["Vegetarian", "Paneer", "Rich"],
  },
];

export default function RecipesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Collection</CardTitle>
          <CardDescription>
            Browse your saved recipes for meal inspiration.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRecipes.map((recipe) => (
          <Card key={recipe.title} className="overflow-hidden">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
              data-ai-hint={recipe.dataAiHint}
            />
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{recipe.title}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
