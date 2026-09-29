import { DayContent } from '../types';

export const day14: DayContent = {
    day: 14,
    title: "Supply-Chain Safety: Tool & Skill Verification",
    summary: "Scan third-party agent skills using NVIDIA SkillSpector to block prompt injection and credential harvesting before deployment.",
    tags: ["Supply Chain", "Security", "CI/CD"],
    icon: "🛡️",
    resourceLink: "https://github.com/nvidia/skillspector",
    codeSnippets: [
        {
            filename: "verify_skill.py",
            language: "python",
            code: `import json, subprocess, sys
from pathlib import Path

def verify_skill(skill_dir: str) -> bool:
    target_path = Path(skill_dir).resolve()
    report_path = Path("report.json")
    # Optional: set SKILLSPECTOR_MODEL=gemini-3.1-pro-preview for semantic LLM scan
    subprocess.run(
        ["skillspector", "scan", "--no-llm", "--format", "json", "--output", str(report_path), "--", str(target_path)],
        capture_output=True, text=True, check=False
    )
    report = json.loads(report_path.read_text())
    threats = [
        i for i in report.get("issues", [])
        if i.get("severity") in ("HIGH", "CRITICAL")
    ]

    if threats:
        print(f"[FAIL] {len(threats)} threat(s) detected in {target_path.name}:")
        for t in threats:
            print(f"  - [{t['severity']}] {t['category']}: {t['pattern']}")
        return False

    print(f"[PASS] {target_path.name} passed SkillSpector verification!")
    return True

if __name__ == "__main__":
    sys.exit(0 if verify_skill(sys.argv[1]) else 1)`
        }
    ],
    links: [
        {
            label: "Day 14 Quickstart Kata (Simple Local Scan)",
            url: "https://github.com/Cybersizemore/advent-agents-supplychain-simple",
            description: "Run NVIDIA SkillSpector locally against clean and toxic skills in under 30 seconds."
        },
        {
            label: "Day 14 Full CI/CD & GCP Agent Registry Pipeline",
            url: "https://github.com/Cybersizemore/sec-agent-advent-supplychain-sec",
            description: "End-to-end GitHub Actions gate with SAT lockfiles, ASBOM generation, and Google Cloud Agent Registry publication."
        },
        {
            label: "NVIDIA SkillSpector Repository",
            url: "https://github.com/nvidia/skillspector",
            description: "Static and semantic security scanner for AI agent skills and tool definitions."
        },
        {
            label: "ADK Tools and Governance",
            url: "https://google.github.io/adk-docs/tools",
            description: "Official guide to building and securing tools in ADK."
        }
    ],
    description: `
**Day 14 of Google's Advent of Agents — Season 3**

Third-party agent skills and MCP tools execute with implicit privileges, exposing runtime environments to prompt injection and credential harvesting. Without automated verification, malicious skills can exfiltrate cloud secrets before reaching production.

**How It Works**

Using **NVIDIA SkillSpector** locally and in CI/CD build gates enables automated static and semantic inspection of skill packages prior to registration:

- **Static AST & Pattern Scanning**: SkillSpector inspects \`SKILL.md\` instructions and embedded scripts for 71 security patterns, including hidden environment harvesting (\`os.environ\`) and unauthorized network calls.
- **Semantic LLM Evaluation**: When configured with \`gemini-3.1-pro-preview\`, SkillSpector evaluates ambiguous instructions to distinguish legitimate tool behavior from concealed prompt injection payloads.
- **Enterprise CI/CD & Registry Governance**: Any \`HIGH\` or \`CRITICAL\` finding returns a non-zero exit code to block toxic skills, while verified skills can be promoted to Google Cloud Agent Registry.

**Resources:**

- [Day 14 Quickstart Kata (Simple Local Scan)](https://github.com/Cybersizemore/advent-agents-supplychain-simple)
- [Day 14 Full CI/CD & GCP Agent Registry Pipeline](https://github.com/Cybersizemore/sec-agent-advent-supplychain-sec)
- [NVIDIA SkillSpector Repository](https://github.com/nvidia/skillspector)
- [ADK Tools and Governance](https://google.github.io/adk-docs/tools)
`,
    videoURL: "https://www.youtube.com/embed/ PLACEHOLDER"
};
