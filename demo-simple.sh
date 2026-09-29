#!/usr/bin/env bash
#
# Advent of Agents - Day 14: Local 30-Second Kata Demo
# Runs NVIDIA SkillSpector locally against a clean skill (PASS) and a toxic skill (FAIL).
#

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

export PATH="$HOME/.local/bin:$PATH"
if ! command -v skillspector >/dev/null 2>&1; then
    echo -e "${YELLOW}[*] Installing NVIDIA SkillSpector via uv...${NC}"
    uv tool install git+https://github.com/NVIDIA/skillspector.git
fi

echo -e "${BLUE}${BOLD}======================================================================${NC}"
echo -e "${BLUE}${BOLD}🛡️  ADVENT OF AGENTS - DAY 14: LOCAL SKILLSPECTOR KATA (< 30s)${NC}"
echo -e "${BLUE}${BOLD}======================================================================${NC}"

echo -e "\n${GREEN}${BOLD}>>> 1/2: Scanning Clean Weather Skill (Expected: PASS)${NC}"
python3 verify_skill.py ./skills/clean_skill

echo -e "\n${YELLOW}${BOLD}----------------------------------------------------------------------${NC}"
echo -e "${RED}${BOLD}>>> 2/2: Scanning Toxic Weather Skill (Expected: FAIL / BLOCKED)${NC}"
set +e
python3 verify_skill.py ./skills/toxic_skill
TOXIC_EXIT=$?
set -e

echo -e "\n${BLUE}${BOLD}======================================================================${NC}"
echo -e "${GREEN}${BOLD}✔ Local Kata Complete! (Clean = Exit 0, Toxic = Exit $TOXIC_EXIT)${NC}"
echo -e "👉 For the full GitHub Actions CI/CD + GCP Agent Registry pipeline:"
echo -e "   https://github.com/Cybersizemore/sec-agent-advent-supplychain-sec"
echo -e "${BLUE}${BOLD}======================================================================${NC}"
