#!/usr/bin/env python3
import json, subprocess, sys
from pathlib import Path

def verify_skill(skill_dir: str) -> bool:
    target_path = Path(skill_dir).resolve()
    if not target_path.is_dir():
        print(f"[FAIL] Skill directory not found: {skill_dir}")
        return False

    report_path = Path("report.json")
    report_path.unlink(missing_ok=True)
    print(f"[*] Scanning skill with NVIDIA SkillSpector: {target_path.name}")
    # Optional: set SKILLSPECTOR_MODEL=gemini-3.1-pro-preview for semantic LLM scan
    subprocess.run(
        ["skillspector", "scan", "--no-llm", "--format", "json", "--output", str(report_path), "--", str(target_path)],
        capture_output=True, text=True, check=False
    )
    if not report_path.exists():
        print("[FAIL] SkillSpector did not produce a valid JSON report.")
        return False

    report = json.loads(report_path.read_text())
    threats = [
        i for i in report.get("issues", [])
        if i.get("severity") in ("HIGH", "CRITICAL")
    ]

    if threats:
        print(f"\n[FAIL] {len(threats)} threat(s) detected in {target_path.name}:")
        for t in threats:
            loc = t.get("location", {})
            print(f"  - [{t['severity']}] {t['category']}: {t['pattern']} (line {loc.get('start_line')})")
        print("[BLOCKED] CI/CD build gate failed.")
        return False

    print(f"\n[PASS] {target_path.name} passed SkillSpector verification!")
    return True

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "./skills/clean_weather_skill"
    sys.exit(0 if verify_skill(target) else 1)
