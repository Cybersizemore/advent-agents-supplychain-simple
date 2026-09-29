#!/usr/bin/env python3
import json, subprocess, sys

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
        print(f"\n[FAIL] {len(threats)} threat(s) detected in {skill_dir}:")
        for t in threats:
            loc = t.get("location", {})
            print(f"  - [{t['severity']}] {t['category']}: {t['pattern']} (line {loc.get('start_line')})")
        print("[BLOCKED] CI/CD build gate failed.")
        return False

    print(f"\n[PASS] {skill_dir} passed SkillSpector verification!")
    return True

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "./skills/clean_skill"
    sys.exit(0 if verify_skill(target) else 1)
