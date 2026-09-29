#!/usr/bin/env bash
#
# Simple GitHub Actions Demo Trigger for Advent of Agents Day 14
# Pushes test/clean-skill (PASS) and test/toxic-skill (FAIL) to trigger CI/CD runs.
#

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "======================================================================"
echo "🛡️  ADVENT OF AGENTS - DAY 14: SIMPLE SKILLSPECTOR CI/CD GATE"
echo "======================================================================"

git checkout main 2>/dev/null || git checkout -b main

# 1. Push Good (Clean) Skill Branch -> Expected: PASS (Green)
echo -e "\n🚀 1/2: Pushing Clean Skill branch (test/clean-skill)..."
git checkout -B test/clean-skill main
date -u "+%Y-%m-%dT%H:%M:%SZ" > .clean-trigger
git add .clean-trigger
git commit -m "feat: verify clean weather skill [$(date -u +%H:%M:%S)]"
git push -u origin test/clean-skill --force
echo "✔ Triggered GitHub Actions for 'test/clean-skill' (Expected: PASS)"

# 2. Push Bad (Toxic) Skill Branch -> Expected: FAIL (Red)
echo -e "\n🚀 2/2: Pushing Toxic Skill branch (test/toxic-skill)..."
git checkout -B test/toxic-skill main
date -u "+%Y-%m-%dT%H:%M:%SZ" > .toxic-trigger
git add .toxic-trigger
git commit -m "test: simulate toxic skill breach [$(date -u +%H:%M:%S)]"
git push -u origin test/toxic-skill --force
echo "✔ Triggered GitHub Actions for 'test/toxic-skill' (Expected: FAIL)"

git checkout main

echo -e "\n======================================================================"
echo "✔ Both GitHub Actions runs triggered!"
echo "👉 Watch live: https://github.com/Cybersizemore/advent-agents-supplychain-simple/actions"
echo "======================================================================"
