## To-Do-List-CLI/

├─ tasks.json        # creato da CLI
├─ package.json
├─ tsconfig.json
└─ src/
   └─ index.ts

git clone https://github.com/bocaletto-luca/TypeScript-Example/To-Do-List-CLI.git
cd To-Do-List-CLI
npm install
npm run build
# Esempi:
./dist/index.js add "Imparare TypeScript"
./dist/index.js list
./dist/index.js done 1
./dist/index.js rm 1
