# ListWise - Your Smart Cart Companion

<p align="center">
  <img src="https://picsum.photos/400/200?grayscale" alt="ListWise Banner" data-ai-hint="grocery app banner" style="border-radius: 8px;" />
</p>

<p align="center">
  <strong>Smart Grocery, Smarter Budget.</strong>
  <br />
  ListWise is a Next.js application designed to make your grocery shopping more efficient and budget-friendly. Leveraging the power of AI, it provides cost estimations for your shopping list, identifies expensive items, and even suggests recipes you can make with your selected ingredients.
</p>

---

## ✨ Features

-   **🤖 AI Budget Assistant**: Get an AI-powered analysis of your shopping list to see if you're within budget.
-   **💸 Expensive Item Alerts**: The AI automatically flags items that are taking up a large portion of your budget.
-   **🧑‍🍳 AI Recipe Suggestions**: Discover new meal ideas with recipes generated based on your grocery list.
-   **🛒 Integrated Shopping Tools**: Manage your shopping list, pantry inventory, and saved recipes all in one place.
-   **Modern UI**: A clean, intuitive, and responsive interface built with Next.js, ShadCN UI, and Tailwind CSS.
-   **Genkit Powered**: Utilizes Google's Genkit for state-of-the-art generative AI capabilities.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running on your machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your system:
*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) (or your preferred package manager like Yarn or pnpm)

### Installation

1.  **Clone the repository** (if you haven't already):
    ```sh
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies**:
    This will install all the necessary packages for the project to run.
    ```sh
    npm install
    ```

### Running the Development Server

1.  **Set up your environment variables**:
    You will need a `.env` file at the root of your project. If you are using Google AI, you'll need to add your API key to it. **Replace `your_google_ai_api_key_here` with your actual key.**
    ```.env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

2.  **Start the application**:
    This command runs the app in development mode with hot-reloading enabled.
    ```sh
    npm run dev
    ```

3.  **Open the app**:
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📝 How to Use

-   **Dashboard / AI Budget Assistant**:
    1.  Navigate to the **Dashboard**.
    2.  Enter your total budget in the "Your Budget" field.
    3.  Add or remove items from the "Grocery Items" list.
    4.  Click **"Analyze My List"**. The AI will calculate the estimated total cost and show you a budget analysis.
    5.  After the analysis, click **"Get Recipe Ideas"** to see what you can cook with your items.

-   **Shopping List, Recipes, Pantry**:
    -   Click on the corresponding links in the sidebar to view your saved shopping lists, recipes, and pantry items. (These are currently static but can be expanded with database functionality).

## ✍️ Author

-   **Name**: [Your Name Here]
-   **Profile**: [Your Website/GitHub Link Here]

---

<p align="center">Made with ❤️ for smart shoppers everywhere.</p>
