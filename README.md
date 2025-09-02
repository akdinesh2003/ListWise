# 🧾 ListWise – Your Smart Cart Companion

**Smart Grocery. Smarter Budget.**  
ListWise is a modern, AI-powered grocery planning app designed to make shopping more efficient, budget-conscious, and personalized. Built with Next.js, ShadCN UI, and Tailwind CSS, it helps users manage their grocery list, pantry, and recipes — all in one place.

---

## ✨ Features

- 🤖 **AI Budget Assistant** – Analyze your grocery list to see if you're within budget.
- 💸 **Expensive Item Alerts** – Automatically flags items that take up a large portion of your budget.
- 🧑‍🍳 **AI Recipe Suggestions** – Discover meal ideas based on your current grocery items.
- 🛒 **Integrated Shopping Tools** – Manage your shopping list, pantry inventory, and saved recipes.
- 🧼 **Modern UI** – Clean, intuitive, and responsive interface.
- ⚙️ **Genkit Powered** – Uses Google's Genkit for advanced generative AI capabilities.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing.

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm (or Yarn / pnpm)

### Installation

```bash
git clone https://github.com/akdinesh2003/ListWise.git
cd ListWise
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file in the root of your project and add your **own API key** for Google AI:

```env
GEMINI_API_KEY=your_google_ai_api_key_here
```

> ⚠️ **Important:** You must use your own API key. This project does not include or expose any shared or public keys.

---

## 🧪 Running the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to view the app.

---

## 📝 How to Use

### 🧠 Dashboard / AI Budget Assistant

- Enter your total budget in the "Your Budget" field.
- Add or remove items from the "Grocery Items" list.
- Click **Analyze My List** to view budget insights.
- Click **Get Recipe Ideas** to generate meals based on your items.

### 🛒 Shopping List, Recipes, Pantry

- Use the sidebar to navigate between your saved lists, recipes, and pantry items.
- These sections are currently static but can be expanded with database integration.

---

## ✍️ Author

**Name:** AK DINESH  
**GitHub:** [akdinesh2003](https://github.com/akdinesh2003)
