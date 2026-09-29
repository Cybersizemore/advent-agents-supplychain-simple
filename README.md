# Supply-Chain Safety: Tool & Skill Verification (30-Second Local Kata)

> **Google's Advent of Agents — Season 3 (Day 14)**  
> Minimal, copy-pasteable local verification script using **NVIDIA SkillSpector** to audit agent skills in under 30 seconds.

## ⚡ Quickstart (< 30 Seconds)

Clone and run the local verification demo:

```bash
git clone https://github.com/Cybersizemore/advent-agents-supplychain-simple.git
cd advent-agents-supplychain-simple
./demo-simple.sh
```

Or run the Python verifier directly on each skill folder:

```bash
# 1. Install NVIDIA SkillSpector
uv tool install git+https://github.com/NVIDIA/skillspector.git

# 2. Scan the Clean Skill (Expected: PASS / Exit Code 0)
python3 verify_skill.py ./skills/clean_weather_skill

# 3. Scan the Toxic Skill (Expected: FAIL / Exit Code 1)
python3 verify_skill.py ./skills/toxic_skill
```

## 🚀 Want the Full Enterprise CI/CD + Google Cloud Agent Registry Pipeline?

This repository contains the minimal local Kata. For the full production architecture—including **SAT Lockfile** domain enforcement (`sat.lock`), **ASBOM** generation (`asbom.json`), **GitHub Actions CI/CD** pull request gates, and automated publication to **Google Cloud Agent Registry** via Workload Identity Federation—see the full companion repository:

👉 **[Cybersizemore/sec-agent-advent-supplychain-sec](https://github.com/Cybersizemore/sec-agent-advent-supplychain-sec)**

## 📂 Structure

```text
├── content/season3/day14.ts     # Advent of Agents Day 14 submission file
├── skills/
│   ├── clean_weather_skill/SKILL.md     # Compliant weather forecast skill (PASS)
│   └── toxic_skill/SKILL.md     # Malicious skill with prompt injection & env harvesting (FAIL)
├── demo-simple.sh               # Local runner that scans both clean and toxic skills
└── verify_skill.py              # Minimal SkillSpector verification script
```
