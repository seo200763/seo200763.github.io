#!/usr/bin/env python3
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
base=root/"GAMESTART"
games=[]
for meta in sorted(base.glob("*/game.json")):
    try:
        data=json.loads(meta.read_text(encoding="utf-8"))
        folder=meta.parent.name
        data.setdefault("id", folder.lower().replace(" ","-"))
        data.setdefault("title", folder)
        data.setdefault("folder", folder)
        if not data.get("launchUrl") and not (meta.parent/"index.html").exists():
            continue
        games.append(data)
    except Exception as exc:
        print(f"Skip {meta}: {exc}")
(base/"games.json").write_text(json.dumps(games,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"Generated {len(games)} GAMESTART entries")
