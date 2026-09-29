import { DayContent } from '../types';

export const day14: DayContent = {
    day: 14,
    title: "Supply-Chain Safety: Tool & Skill Verification",
    summary: "Scan third-party agent skills in CI/CD pipelines using NVIDIA SkillSpector to block prompt injection and credential harvesting before deployment.",
    tags: ["Supply Chain", "Security", "CI/CD"],
    icon: "🛡️",
    resourceLink: "https://github.com/nvidia/skillspector",
    codeSnippets: [
        {
            filename: "verify_skill.py",
            language: "python",
            code: `import json, subprocess, sys

def verify_skill(skill_dir: str) -> bool:
    print(f"[*] Scanning skill with NVIDIA SkillSpector: {skill_dir}")
    # Optional: set SKILLSPECTOR_MODEL=gemini-3.1-pro-preview for semantic LLM scan
    res = subprocess.run(
        ["skillspector", "scan", skill_dir, "--no-llm", "--format", "json"],
        capture_output=True, text=True
    )
    report = json.loads(res.stdout[res.stdout.find("{"):])
    threats = [
        i for i in report.get("issues", [])
        if i.get("severity") in ("HIGH", "CRITICAL")
    ]

    if threats:
        print(f"[FAIL] {len(threats)} threat(s) detected in {skill_dir}:")
        for t in threats:
            print(f"  - [{t['severity']}] {t['category']}: {t['pattern']}")
        return False

    print(f"[PASS] {skill_dir} passed SkillSpector verification!")
    return True

if __name__ == "__main__":
    sys.exit(0 if verify_skill(sys.argv[1]) else 1)`
        }
    ],
    links: [
        {
            label: "NVIDIA SkillSpector Repository",
            url: "https://github.com/nvidia/skillspector",
            description: "Static and semantic security scanner for AI agent skills and tool definitions."
        },
        {
            label: "Day 14 Companion Repository",
            url: "https://github.com/Cybersizemore/advent-agents-supplychain-simple",
            description: "Minimal CI/CD build gate example with clean and toxic agent skills."
        },
        {
            label: "ADK Tools and Governance",
            url: "https://google.github.io/adk-docs/tools",
            description: "Official guide to building and securing tools in ADK."
        }
    ],
    description: `
**Day 14 of Google's Advent of Agents — Season 3**

Third-party agent skills and MCP tools execute with implicit privileges, exposing runtime environments to prompt injection and credential harvesting. Without automated verification in CI/CD, malicious skills can exfiltrate cloud secrets before reaching production.

**How It Works**

Embedding **NVIDIA SkillSpector** into GitHub Actions pull request gates enables automated static and semantic inspection of skill packages prior to deployment:

- **Static AST & Pattern Scanning**: SkillSpector inspects \`SKILL.md\` instructions and embedded scripts for 71 security patterns, including hidden environment harvesting (\`os.environ\`) and unauthorized network calls.
- **Semantic LLM Evaluation**: When configured with \`gemini-3.1-pro-preview\`, SkillSpector evaluates ambiguous instructions to distinguish legitimate tool behavior from concealed prompt injection payloads.
- **Fail-Closed CI/CD Gate**: Any \`HIGH\` or \`CRITICAL\` finding returns a non-zero exit code in \`verify_skill.py\`, immediately blocking toxic skills from merging while allowing clean skills through.

**Resources:**

- [NVIDIA SkillSpector Repository](https://github.com/nvidia/skillspector)
- [Day 14 Companion Repository](https://github.com/Cybersizemore/advent-agents-supplychain-simple)
- [ADK Tools and Governance](https://google.github.io/adk-docs/tools)
`,
    videoURL: "https://www.youtube.com/embed/ PLACEHOLDER"
};
