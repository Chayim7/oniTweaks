import re
from pathlib import Path
root = Path(r'C:\Users\euris\OneDrive\Desktop\OniTweaks\templates')
card_classes = [
    'category-card','why-card','result-card','result-showcase-card','pack-card','pack-card-large',
    'tool-card','resource-card','article-card','testimonial-card','stat-card','guide-card','sidebar-card','info-card','hero-info-card'
]
pattern = re.compile(r'class="([^"]*)"')
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    def repl(match):
        classes = match.group(1).split()
        if 'site-card' not in classes and any(c in classes for c in card_classes):
            classes.insert(0, 'site-card')
            return 'class="' + ' '.join(classes) + '"'
        return match.group(0)
    new_text = pattern.sub(repl, text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Updated {path}')
