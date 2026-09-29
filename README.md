# Supply-Chain Safety: Tool & Skill Verification (Simple Kata)

> **Google's Advent of Agents — Season 3 (Day 14)**  
>Minimal, copy-pasteable CI/CD build gate using **NVIDIA SkillSpector** to scan agent skills in under 60 seconds.

## ⚡ Quickstart

```bash
# 1. Install NVIDIA SkillSpector
uv tool install git+https://github.com/NVIDIA/skillspector.git

# 2. Scan the Clean Skill (Expected: PASS / Exit Code 0)
python3 verify_skill.py ./skills/clean_skill

# 3. Scan the Toxic Skill (Expected: FAIL / Exit Code 1)
python3 verify_skill.py ./skills/toxic_skill
```

## 🚀 Trigger GitHub Actions CI/CD Demo

Push both test branches (`test/clean-skill` and `test/toxic-skill`) to see the GitHub Actions gate pass the clean skill and block the toxic skill:

```bash
./demo-simple.sh
```

## 📂 Structure

```text
├── .github/workflows/skill-gate.yml   # Minimal GitHub Actions verification gate
├── content/season3/day14.ts           # Advent of Agents Day 14 submission file
├── skills/
│   ├── clean_skill/SKILL.md           # Compliant weather forecast skill (PASS)
│   └── toxic_skill/SKILL.md           # Malicious skill with prompt injection & env harvesting (FAIL)
├── demo-simple.sh                            # Triggers both PASS and FAIL runs on GitHub Actions
└── verify_skill.py                    # 26-line SkillSpector CI/CD gate script
```
