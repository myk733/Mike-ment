# Mike Care Builds - Frontend

This is the frontend application for Mike Care Builds, a mobile mental health and wellness app tailored for Kenyan users.

## How to Run the App Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/myk733/Mike-ment.git
    cd Mike-ment
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Start the development server:**
    ```bash
    pnpm run dev
    ```
    The app will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

### GitHub Pages (for static frontend)

Since this is a React application, you can deploy it to GitHub Pages. Follow these steps:

1.  **Install `gh-pages`:**
    ```bash
    pnpm install gh-pages --save-dev
    ```
2.  **Add deployment scripts to `package.json`:**
    Open `package.json` and add the following scripts:
    ```json
    "homepage": "https://<your-github-username>.github.io/Mike-ment",
    "scripts": {
      "predeploy": "pnpm run build",
      "deploy": "gh-pages -d dist",
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"
    }
    ```
    Replace `<your-github-username>` with your actual GitHub username.

3.  **Deploy to GitHub Pages:**
    ```bash
    pnpm run deploy
    ```
    Your app will be deployed to `https://<your-github-username>.github.io/Mike-ment`.

### Other Static Hosting Sites (e.g., Netlify, Vercel)

For other static hosting providers, you typically need to:

1.  **Build the project:**
    ```bash
    pnpm run build
    ```
    This will create a `dist` folder with the optimized production build.

2.  **Deploy the `dist` folder:**
    Follow the specific instructions of your chosen hosting provider to deploy the contents of the `dist` folder. Most providers allow you to connect directly to your GitHub repository and will automatically build and deploy the `dist` folder on every push to the `master` branch.



