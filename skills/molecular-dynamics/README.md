# Molecular Dynamics Skill

Molecular dynamics workflows with OpenMM and MDAnalysis: prepare protein and small-molecule systems, minimize and equilibrate solvated systems, run staged NVT/NPT simulations, and analyze trajectories with RMSD, RMSF, contacts, PCA, hydrogen bonds, and relative free-energy surfaces. The recipe keeps force-field choices, periodic geometry, sampling limits, and provenance explicit; a stable trajectory is not by itself evidence of binding free energy or residence time.

The upstream recipe was imported from [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/molecular-dynamics) at revision `a1043ef544e3a100c28e70a736b6cf32554d0677` (2026-10-16). The bundled references are reviewed for OpenMM 8.6.1 and MDAnalysis 2.10.0; installation, force-field assets, GPU support, and optional PDBFixer/OpenFF dependencies remain separate.

## Install

A Skill is a directory of files, so installing one is copying that directory
somewhere an agent looks. With Node 18+ and `git` on `PATH` (npm resolves a
`github:` spec through it), and nothing cloned:

```bash
npx github:PKU-YuanGroup/OpenAI4S install molecular-dynamics --target claude
```

`--target claude` writes to `~/.claude/skills`, `claude-project` to
`./.claude/skills`, `openai4s` to `<data_dir>/user-skills`, and `--dir <path>`
to anywhere you name. The resolved absolute path is printed before anything is
written there, and `--dry-run` stops at that plan. A reinstall refuses to
overwrite a copy you have edited or one it did not install, and `uninstall`
removes only the files it wrote. For a recipe included in the npm release:

```bash
npx @pku-yuangroup/openai4s-skills install molecular-dynamics --target claude
```

The npm catalog can differ from this repository. Without Node, take this
directory itself, or package it as a zip for an upload field. If you already run
OpenAI4S there is nothing to install—the wheel ships bundled Skills, and a
bundled Skill takes precedence over a same-named copy in `<data_dir>/user-skills`.

## Files

| File | Responsibility |
| --- | --- |
| [`LICENSE.md`](LICENSE.md) | The upstream MIT license for this imported Skill. |
| [`SKILL.md`](SKILL.md) | The OpenMM simulation runbook and MDAnalysis trajectory-analysis workflow, including preparation, staged equilibration, validation, periodic geometry, and provenance limits. |

## Subdirectories

| Directory | Responsibility |
| --- | --- |
| [`references/`](references/) | Read on demand for MDAnalysis analysis patterns and conservative system-preparation and force-field guidance. |
