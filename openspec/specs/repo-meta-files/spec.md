# Repo Meta Files Specification

## Purpose

Defines the repository-level meta files that make the project discoverable, keep generated files out of version control, and state its licensing terms.

## Requirements

### Requirement: README documents the project

The repository root SHALL contain a `README.md` that identifies the project as a tic-tac-toe game, names the tech stack (React 18, Vite), and lists commands for installing dependencies, running the dev server, running tests, and building for production.

#### Scenario: New contributor can run the project from README alone

- **WHEN** a reader follows only the instructions in `README.md`
- **THEN** they find the install command (`npm install`) and working commands for dev (`npm run dev`), test (`npm test`), and build (`npm run build`)

#### Scenario: README reflects actual scripts

- **WHEN** the commands documented in `README.md` are compared against `package.json` scripts
- **THEN** every documented command corresponds to an existing script

### Requirement: Generated files stay out of version control

The repository root SHALL contain a `.gitignore` such that dependency, build-output, environment, editor, and OS artifact directories/files (`node_modules/`, `dist/`, `.env*`, editor directories, OS junk files) are never tracked by Git.

#### Scenario: Build output is ignored

- **WHEN** `git check-ignore dist node_modules` is evaluated in a repository containing built output and installed dependencies
- **THEN** both paths are reported as ignored

#### Scenario: Status stays clean after build and install

- **WHEN** dependencies are installed and the production build is produced in a fresh clone with no local changes
- **THEN** `git status --porcelain` reports no untracked or modified files

### Requirement: License is GPL-3.0-only

The repository root SHALL contain a `LICENSE` file with the full text of the GNU General Public License v3.0, and `package.json` SHALL declare `"license": "GPL-3.0-only"`.

#### Scenario: License text present

- **WHEN** `LICENSE` at the repo root is inspected
- **THEN** it contains the verbatim GNU General Public License version 3 text

#### Scenario: Tooling reports consistent license

- **WHEN** `package.json` is read by tooling that surfaces the `license` field
- **THEN** it reports `GPL-3.0-only`, matching the `LICENSE` file
