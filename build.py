#!/usr/bin/env python3
"""Assemble the static site: shared head, nav and footer around each page body in src/pages/.
Run: python3 build.py   (writes *.html into the site root)"""
import re, pathlib, html

ROOT = pathlib.Path(__file__).parent
PAGES = ROOT / "src" / "pages"

NAV = [
    ("delivery.html", "Delivery"),
    ("distribution.html", "Distribution"),
    ("motorcycles.html", "Motorcycles"),
    ("investments.html", "Investments"),
    ("impact.html", "Impact"),
    ("technology.html", "Technology"),
    ("about.html", "About"),
]

def head(title, desc, canonical, lang="en", base="", alt=""):
    dir_attr = ' dir="rtl"' if lang == "ar" else ""
    alt_link = f'\n<link rel="alternate" hreflang="{"en" if lang=="ar" else "ar"}" href="https://dikendelivery.com/{alt}">' if alt is not None else ""
    return f"""<!doctype html>
<html lang="{lang}"{dir_attr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="https://dikendelivery.com/{canonical}">{alt_link}
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:image" content="https://dikendelivery.com/assets/img/hero-lineup-1200.jpg">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0b0b0c">
<link rel="icon" type="image/png" href="{base}assets/brand/favicon-64.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="{base}css/site.css">
</head>
<body>
<a class="skip" href="#main">{"تخطي إلى المحتوى" if lang=="ar" else "Skip to content"}</a>
"""

NAV_AR = [
    ("delivery.html", "التوصيل"),
    ("distribution.html", "التوزيع"),
    ("motorcycles.html", "الدراجات"),
    ("investments.html", "الاستثمارات"),
    ("impact.html", "الأثر"),
    ("technology.html", "التقنية"),
    ("about.html", "من نحن"),
]

def nav(current, lang="en", base=""):
    items_src = NAV_AR if lang == "ar" else NAV
    items = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if href == current else ""}>{label}</a>'
        for href, label in items_src
    )
    if lang == "ar":
        switch = f'<a class="lang" href="../{current}" lang="en" hreflang="en">English</a>'
        contact = "تواصل معنا"; brand_small = "الدكن · منذ 1990"; menu = "القائمة"
    else:
        switch = f'<a class="lang" href="ar/{current}" lang="ar" hreflang="ar">العربية</a>'
        contact = "Contact us"; brand_small = "BROS · SINCE 1990"; menu = "Menu"
    return f"""<header class="nav">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Diken Bros home">
      <img src="{base}assets/brand/diken-d-512.png" alt="" width="36" height="36">
      <span>DIKEN<small>{brand_small}</small></span>
    </a>
    <nav class="navlinks" id="navlinks" aria-label="Main">
      {items}
      {switch}
      <a class="btn primary" href="contact.html">{contact}</a>
    </nav>
    <button class="navtoggle" aria-expanded="false" aria-controls="navlinks" aria-label="{menu}"><i class="ph ph-list" aria-hidden="true"></i></button>
  </div>
</header>
<main id="main">
"""

FOOTER_EN = """</main>
<footer>
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="index.html"><img src="assets/brand/diken-d-512.png" alt="" width="36" height="36"><span>DIKEN<small>BROS · SINCE 1990</small></span></a>
        <p style="margin-top:16px;max-width:36ch">Distribution, motorcycles, delivery and investments. Amman, Riyadh and Dubai.</p>
        <p dir="rtl" lang="ar" style="margin-top:10px;color:var(--fg-3)">شركة الدكن</p>
      </div>
      <div>
        <h3>Divisions</h3>
        <ul>
          <li><a href="delivery.html">Delivery &amp; Logistics</a></li>
          <li><a href="distribution.html">Distribution &amp; Agencies</a></li>
          <li><a href="motorcycles.html">Motorcycles</a></li>
          <li><a href="investments.html">Investments</a></li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li><a href="impact.html">Impact</a></li>
          <li><a href="technology.html">Technology</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li><a href="tel:+96264166660" class="num">06 416 6660</a></li>
          <li><a href="mailto:info@dikenbros.com">info@dikenbros.com</a></li>
          <li>Amman: Abu Alanda, Wadi Saqra, Shafa Badran</li>
          <li>Irbid and Zarqa</li>
        </ul>
      </div>
    </div>
    <div class="base">
      <span>© 2026 Diken Bros. All rights reserved.</span>
      <span>Draft one, September 2026</span>
    </div>
  </div>
</footer>
<script src="js/site.js"></script>
</body>
</html>
"""

FOOTER_AR = """</main>
<footer>
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="index.html"><img src="../assets/brand/diken-d-512.png" alt="" width="36" height="36"><span>DIKEN<small>الدكن · منذ 1990</small></span></a>
        <p style="margin-top:16px;max-width:36ch">التوزيع، الدراجات النارية، التوصيل والاستثمارات. عمّان والرياض ودبي.</p>
        <p style="margin-top:10px;color:var(--fg-3)">شركة الدكن</p>
      </div>
      <div>
        <h3>الأقسام</h3>
        <ul>
          <li><a href="delivery.html">التوصيل والخدمات اللوجستية</a></li>
          <li><a href="distribution.html">التوزيع والوكالات</a></li>
          <li><a href="motorcycles.html">الدراجات النارية</a></li>
          <li><a href="investments.html">الاستثمارات</a></li>
        </ul>
      </div>
      <div>
        <h3>الشركة</h3>
        <ul>
          <li><a href="impact.html">الأثر</a></li>
          <li><a href="technology.html">التقنية</a></li>
          <li><a href="about.html">من نحن</a></li>
          <li><a href="contact.html">تواصل معنا</a></li>
        </ul>
      </div>
      <div>
        <h3>تواصل</h3>
        <ul>
          <li><a href="tel:+96264166660" class="num" dir="ltr">06 416 6660</a></li>
          <li><a href="mailto:info@dikenbros.com" dir="ltr">info@dikenbros.com</a></li>
          <li>عمّان: أبو علندا، وادي صقرة، شفا بدران</li>
          <li>إربد والزرقاء</li>
        </ul>
      </div>
    </div>
    <div class="base">
      <span>© 2026 شركة الدكن. جميع الحقوق محفوظة.</span>
      <span>المسودة الأولى، أيلول 2026</span>
    </div>
  </div>
</footer>
<script src="../js/site.js"></script>
</body>
</html>
"""

def build_one(src, lang):
    text = src.read_text(encoding="utf-8")
    m = re.match(r"<!--\s*title:(.*?)\|\s*desc:(.*?)-->\s*", text, re.S)
    if not m:
        raise SystemExit(f"{src.name}: missing '<!-- title: ... | desc: ... -->' header")
    title, desc = m.group(1).strip(), m.group(2).strip()
    body = text[m.end():]
    name = src.name
    if lang == "ar":
        base = "../"; canonical = "ar/" + ("" if name == "index.html" else name); alt = "" if name == "index.html" else name
        body = body.replace('src="assets/', 'src="../assets/').replace("url('assets/", "url('../assets/")
        body = re.sub(r'srcset="([^"]*)"', lambda m: 'srcset="' + m.group(1).replace('assets/', '../assets/') + '"', body)
        out = head(title, desc, canonical, "ar", base, alt) + nav(name, "ar", base) + body + FOOTER_AR
        dest = ROOT / "ar" / name
    else:
        canonical = "" if name == "index.html" else name; alt = "ar/" + canonical
        out = head(title, desc, canonical, "en", "", alt) + nav(name) + body + FOOTER_EN
        dest = ROOT / name
    if "—" in out or "–" in out:
        raise SystemExit(f"{lang}/{name}: em/en dash found; use a hyphen or rewrite")
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(out, encoding="utf-8")
    print("built", lang, name)

def build():
    for src in sorted(PAGES.glob("*.html")):
        build_one(src, "en")
    for src in sorted((PAGES / "ar").glob("*.html")):
        build_one(src, "ar")

if __name__ == "__main__":
    build()
