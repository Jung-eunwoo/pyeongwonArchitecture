"""포트폴리오 사진의 화면 크기별 변형(400w·800w)과 크기 정보 목록을 만든다.

사용법 (Pillow 필요: pip install pillow):
    python3 scripts/image-variants.py

- 입력: public/images/portfolio/*.webp (이름이 -400/-800 으로 끝나는 변형은 제외)
- 출력: 같은 폴더에 {이름}-400.webp, {이름}-800.webp (원본이 그보다 클 때만)
        src/constants/portfolio-images.json (원본 크기·변형 목록 → srcset 생성에 사용)
새 사진을 추가하면 이 스크립트를 다시 실행하고 결과를 함께 커밋한다.
"""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public/images/portfolio"
MANIFEST = ROOT / "src/constants/portfolio-images.json"
WIDTHS = (400, 800)
QUALITY = 78

manifest = {}
for path in sorted(SRC_DIR.glob("*.webp")):
    if re.search(r"-(" + "|".join(map(str, WIDTHS)) + r")$", path.stem):
        continue
    with Image.open(path) as im:
        width, height = im.size
        variants = []
        for target in WIDTHS:
            if width <= target:
                continue
            out = path.with_name(f"{path.stem}-{target}.webp")
            resized = im.resize((target, round(height * target / width)), Image.LANCZOS)
            resized.save(out, "WEBP", quality=QUALITY, method=6)
            variants.append(target)
    manifest[f"/images/portfolio/{path.name}"] = {
        "width": width,
        "height": height,
        "variants": variants,
    }

MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"{len(manifest)} images → {MANIFEST.relative_to(ROOT)}")
