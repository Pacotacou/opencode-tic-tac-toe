# Design: add-project-meta-files

## Context

The repo is a fresh React 18 + Vite 5 project (`package.json`, `src/`, `vite.config.js`, committed `dist/` output present on disk) with no commits yet, no README, no `.gitignore`, no LICENSE. Motivation in proposal.md; behavior contract in specs/repo-meta-files/spec.md.

## Goals / Non-Goals

**Goals:**

- Three new root files (`README.md`, `.gitignore`, `LICENSE`) plus one-line `package.json` change.
- `.gitignore` that keeps `node_modules/` and `dist/` untracked so the first real commit is clean.

**Non-Goals:**

- No CI, contributing guide, changelog, or GitHub-specific files.
- No changes to scripts, dependencies, or application code.

## Decisions

- **License: GPL-3.0-only, verbatim text from gnu.org.** User selected GPL-3.0 over MIT/Apache-2.0/no-license. Use the official https://www.gnu.org/licenses/gpl-3.0.txt copy unmodified - the FSF requires exact text for the license to apply. Use SPDX expression `GPL-3.0-only` (not `GPL-3.0`) in `package.json`, matching npm's SPDX-valid identifier list; `-or-later` is deliberately not offered since only the user can grant future-version sublicensing. Alternative considered: adding a `license` notice header to each source file - rejected as noise for a small project; the root LICENSE + package.json suffice.
- **`.gitignore`: standard Node/Vite template.** Ignore `node_modules/`, `dist/`, `*.local`, logs, editor dirs (`.vscode/`, `.idea/` except shared settings), `.DS_Store`. Un-ignore nothing; no `!.gitkeep` rules needed yet. Alternative considered: hand-rolled minimal ignore list - rejected; the Vite scaffold template covers cases (e.g., `.env.local`) this project will hit as it grows.
- **README: short, command-first.** Sections: project title + one-liner, tech stack, Getting Started (install/dev/test/build commands matching `package.json` scripts), License section linking LICENSE. Alternative considered: badges and screenshots - deferred until there is a public URL to badge against.
- **Commit hygiene:** `dist/` currently exists but nothing is committed yet (no commits on `main`), so ignoring it needs no `git rm --cached`.

## Risks / Trade-offs

- [GPL-3.0 text drifts if copied from an unofficial mirror] → Copy byte-for-byte from gnu.org and spot-check the version line ("Version 3, 29 June 2007").
- [npm may warn on non-SPDX identifiers] → Use exactly `GPL-3.0-only`.
- [README commands rot if scripts are renamed] → Spec scenario pins README commands to actual `package.json` scripts; revisit on script renames.

## Migration Plan

None needed - additive file creation before the first commit; rollback is deleting the files and reverting the one-line `package.json` edit.

## Open Questions

None.
