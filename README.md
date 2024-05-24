## Project Requirements

Before running the project, ensure your system meets the following requirements:

- Node.js 22.0.0
- MongoDB Atlas

- **Backend Installation:**
  - The Bestiary Frontend relies on the Bestiary Backend for seamless functionality.
  - Follow the instructions in the [Backend Repository](https://github.com/itsrusty/service-pokedex) to set up and configure the backend before initiating the frontend.
- Internet access

## Installation

Follow these steps to install and configure the project:

1. Clone the repository: `git clone https://github.com/itsrusty/pokedex-prueba-fullstack.git`
2. Enter the project directory: `cd pokedex-prueba-fullstack`
3. Install dependencies: `npm install`
4. Modify the file with the IP and port of the backend: `src/globalVariables.tsx`

## Project Structure

```
└── 📁pokedex-prueba-fullstack
    └── .gitignore
    └── README.md
    └── 📁config
        └── development.json
    └── package-lock.json
    └── package.json
    └── 📁public
        └── favicon.ico
        └── index.html
        └── logo192.png
        └── manifest.json
        └── 📁pokedex
            └── missing.jpg
        └── 📁pokemon
            └── missing.jpeg
    └── 📁src
        └── App.css
        └── App.tsx
        └── 📁components
            └── 📁common
                └── Header.tsx
                └── PokemonForm.tsx
            └── 📁home
                └── HomeBody.tsx
            └── 📁pokedexLimit
                └── PokedexLimitBody.tsx
                └── 📁body
                    └── PokemonCard.tsx
            └── 📁pokedexToPdf
                └── PokedexToPdfBody.tsx
                └── 📁body
                    └── PokemonCard.tsx
            └── 📁pokemonCrud
                └── PokemonBody.tsx
                └── 📁body
                    └── PokemonCard.tsx
                    └── PokemonForm.tsx
        └── globalVariables.tsx
        └── index.css
        └── index.tsx
        └── logo.svg
        └── 📁pages
            └── Home.tsx
            └── PokedexLimit.tsx
            └── PokedexToPdf.tsx
            └── PokemonCRUD.tsx
        └── react-app-env.d.ts
        └── setupTests.ts
    └── tsconfig.json
```

## Usage

To test in dev mode:

```bash
npm start
```

Build the project:

```bash
npm run build
```
