"""포트폴리오 사진의 화면 크기별 변형(400w·800w)과 크기 정보 목록을 만든다.

사용법 (Pillow 필요: pip install pillow):
    python3 scripts/image-variants.py

- 입력: public/images/portfolio/*.webp (이름이 -400/-800 으로 끝나는 변형은 제외)
- 출력: 같은 폴더에 {이름}-400.webp, {이름}-800.webp (원본이 그보다 클 때만)
        src/constants/portfolio-images.json (원본 크기·변형 목록 → srcset 생성에 사용)
        public/sitemap.xml 의 이미지 항목 (사무실 사진 + 포트폴리오 원본)
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
            out = path.with_name(f"{path.stem}-{target}.webp")
            if width <= target:
                # 원본이 작아져 더 이상 쓰지 않는 예전 변형은 지운다 (srcset 에 없는 파일이 남지 않게)
                out.unlink(missing_ok=True)
                continue
            resized = im.resize((target, round(height * target / width)), Image.LANCZOS)
            resized.save(out, "WEBP", quality=QUALITY, method=6)
            variants.append(target)
    manifest[f"/images/portfolio/{path.name}"] = {
        "width": width,
        "height": height,
        "variants": variants,
    }

# sitemap.xml 이미지 항목 갱신 (<url> 안의 <image:image> 목록만 다시 씀)
SITE = "https://pyeongwon-architecture.netlify.app"
SITEMAP = ROOT / "public/sitemap.xml"
image_paths = ["/images/office.webp", *manifest.keys()]
image_xml = "\n".join(
    f"    <image:image>\n      <image:loc>{SITE}{p}</image:loc>\n    </image:image>"
    for p in image_paths
)
sitemap = SITEMAP.read_text(encoding="utf-8")
sitemap = re.sub(r"\n    <image:image>.*</image:image>", "", sitemap, flags=re.S)
sitemap = sitemap.replace("\n  </url>", f"\n{image_xml}\n  </url>", 1)
SITEMAP.write_text(sitemap, encoding="utf-8")

MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"{len(manifest)} images → {MANIFEST.relative_to(ROOT)}")
