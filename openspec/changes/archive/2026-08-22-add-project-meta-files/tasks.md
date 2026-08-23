# Tasks: add-project-meta-files

## 1. License

- [x] 1.1 Fetch the official GPL-3.0 text from https://www.gnu.org/licenses/gpl-3.0.txt and write it verbatim to `LICENSE` at the repo root
- [x] 1.2 Verify the file starts with the GPL preamble ("This program is free software...") and contains the "Version 3, 29 June 2007" version line
- [x] 1.3 Add `"license": "GPL-3.0-only"` to `package.json` (after `"version"`), keeping valid JSON

## 2. Gitignore

- [x] 2.1 Create `.gitignore` with Node/Vite entries: `node_modules/`, `dist/`, `dist-ssr/`, `*.local`, log files (`logs/`, `*.log`, `npm-debug.log*`, `yarn-debug.log*`, `yarn-error.log*`, `pnpm-debug.log*`, `lerna-debug.log*`), `.env` variants (`.env`, `.env.*`, `!.env.example`), editor dirs (`.vscode/*` except `!.vscode/extensions.json`, `.idea/`, `.DS_Store`, `*.suo`, `*.ntvs*`, `*.njsproj`, `*.sln`, `*.sw?`)
- [x] 2.2 Run `git check-ignore dist node_modules` and confirm both are reported as ignored
- [x] 2.3 Run `git status --porcelain` after `npm install` and `npm run build` in a scratch state and confirm no generated files appear as untracked

## 3. README

- [x] 3.1 Create `README.md` with: project title ("Tic Tac"), one-paragraph description of the tic-tac-toe game, tech stack list (React 18, Vite 5, Vitest)
- [x] 3.2 Add a Getting Started section documenting exactly `npm install`, `npm run dev`, `npm test`, `npm run build` — cross-check each against `scripts` in `package.json`
- [x] 3.3 Add a License section stating the project is licensed under GPL-3.0-only and linking to `LICENSE`

## 4. Validation

- [x] 4.1 Run `openspec validate add-project-meta-files --strict` and fix any reported issues
- [x] 4.2 Confirm all three files exist at repo root and no application code under `src/` was modified
