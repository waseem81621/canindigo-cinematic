# Branching & Experimentation Workflow

## Branch Roles
- **main** — Stable production. Only verified builds land here. 
  Last verified production deploy: 2e58191 (Phase 8.1).
- **design-experiments-v1** — Experimentation sandbox. Safe to 
  break, try things, throw away. Currently active.
- **pre-rebuild-backup** — Original pre-Phase-0 state. Untouched 
  safety net. Authored under old identity, do not modify.
- **v1.0-stable** (tag) — Immutable recovery point for the 
  production-launched Phase 8.1 build. Use 
  `git checkout v1.0-stable` to inspect or recover this exact 
  state.

## Folder Layout
- `d:\Claude-Projects\aamtci-website-om\` — on main, production work only
- `d:\Claude-Projects\aamtci-experiments\` — on design-experiments-v1, 
  experimentation sandbox

## Workflow for New Experiments
1. Make sure you start from main: 
   `git checkout main && git pull`
2. Create a focused experiment branch from main: 
   `git checkout -b design-<short-description>`
3. Make changes, commit, push
4. Manually deploy to preview when ready: `vercel deploy --yes`
5. Test the preview URL
6. If experiment works: merge to main 
   (`git checkout main && git merge design-<short-description>`)
   then deploy production: `vercel deploy --prod --yes`
7. If experiment fails: discard 
   (`git checkout main && git branch -D design-<short-description> 
   && git push origin --delete design-<short-description>`)

## Recovery
If main ever needs to be reset to the production-launched state:

```bash
git checkout main
git reset --hard v1.0-stable
git push --force-with-lease origin main
vercel deploy --prod --yes
```
