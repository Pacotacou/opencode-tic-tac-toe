# Proposal: add-project-meta-files

## Why

The repository ships no README, `.gitignore`, or LICENSE: there is nothing telling a newcomer what the project is or how to run it, Git currently sees generated output (`dist/`) and dependencies (`node_modules/`) as trackable noise, and the absence of a license means no one legally may copy, modify, or redistribute the code.

## What Changes

- Add a root `README.md` describing what Tic Tac is, its tech stack (React 18 + Vite), and the commands to install, develop, test, and build.
- Add a root `.gitignore` covering Node/Vite artifacts (`node_modules/`, `dist/`, editor and OS noise) so generated files stay out of version control.
- Add a root `LICENSE` applying the GNU General Public License v3.0 (GPL-3.0-only), per user decision.
- Mark the license in `package.json` via a `"license": "GPL-3.0-only"` field so tooling reports it consistently.

## Capabilities

### New Capabilities

- `repo-meta-files`: The repository-level meta files (README, .gitignore, LICENSE) — which files must exist at the repo root, what each must contain, and the externally observable effects (clean `git status`, discoverable run instructions, stated redistribution terms).

### Modified Capabilities

None.

## Impact

- New files at repo root: `README.md`, `.gitignore`, `LICENSE`.
- Modified file: `package.json` (adds `license` field only; no dependency or script changes).
- No application code, runtime behavior, or existing specs are affected.
