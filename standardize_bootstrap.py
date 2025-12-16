#!/usr/bin/env python3
"""
Standardize Bootstrap to version 3.4.1 CDN across all HTML files.
This script:
1. Removes local Bootstrap CSS/JS references
2. Removes local jQuery references  
3. Adds Bootstrap 3.4.1 CDN with SRI (if not already present)
4. Adds jQuery 3.6.0 CDN with SRI (if not already present)
5. Maintains proper order: CSS before JS
"""

import re
from pathlib import Path


# Standard CDN resources with SRI
BOOTSTRAP_CSS_CDN = '''<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">'''

JQUERY_CDN = '''<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK" crossorigin="anonymous"></script>'''

BOOTSTRAP_JS_CDN = '''<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>'''


def standardize_bootstrap(filepath):
    """Standardize Bootstrap in a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Step 1: Remove all local Bootstrap CSS references
    content = re.sub(
        r'\s*<link[^>]+href="[^"]*bootstrap[^"]*\.css"[^>]*>\s*',
        '\n',
        content
    )
    
    # Step 2: Remove all local Bootstrap JS references (with space in path too)
    content = re.sub(
        r'\s*<script[^>]+src="[^"]*bootstrap[^"]*\.js"[^>]*>\s*(?:</script>)?\s*',
        '\n',
        content
    )
    
    # Step 3: Remove all local jQuery references
    content = re.sub(
        r'\s*<script[^>]+src="[^"]*jquery[^"]*\.js"[^>]*>\s*(?:</script>)?\s*',
        '\n',
        content
    )
    
    # Step 4: Remove existing CDN Bootstrap/jQuery (to avoid duplicates)
    content = re.sub(
        r'\s*<link[^>]*stackpath[^>]*bootstrap[^>]*>\s*',
        '\n',
        content
    )
    content = re.sub(
        r'\s*<script[^>]*stackpath[^>]*bootstrap[^>]*>\s*(?:</script>)?\s*',
        '\n',
        content
    )
    content = re.sub(
        r'\s*<script[^>]*jquery\.com[^>]*>\s*(?:</script>)?\s*',
        '\n',
        content
    )
    
    # Step 5: Find insertion points and add CDN resources
    # Add Bootstrap CSS after <title> tag
    title_pattern = r'(</title>)'
    if re.search(title_pattern, content):
        content = re.sub(
            title_pattern,
            r'\1\n    ' + BOOTSTRAP_CSS_CDN,
            content,
            count=1
        )
    
    # Add jQuery and Bootstrap JS before first custom script or before </head>
    # Look for handlebars, pub.js, nav.js, or gallery.js
    custom_script_pattern = r'(\s*<script[^>]+(?:handlebars|pub\.js|nav\.js|gallery\.js))'
    if re.search(custom_script_pattern, content):
        content = re.sub(
            custom_script_pattern,
            '\n    ' + JQUERY_CDN + '\n    ' + BOOTSTRAP_JS_CDN + r'\1',
            content,
            count=1
        )
    else:
        # No custom scripts, add before </head>
        content = re.sub(
            r'(\s*</head>)',
            '\n    ' + JQUERY_CDN + '\n    ' + BOOTSTRAP_JS_CDN + r'\1',
            content,
            count=1
        )
    
    # Clean up multiple consecutive newlines
    content = re.sub(r'\n\n\n+', '\n\n', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    """Process all HTML files."""
    base_dir = Path('.')
    html_files = sorted(base_dir.rglob('*.html'))
    
    print("Standardizing Bootstrap across all HTML files...\n")
    
    updated = 0
    skipped = 0
    errors = 0
    
    for html_file in html_files:
        try:
            if standardize_bootstrap(html_file):
                print(f"✓ {html_file}")
                updated += 1
            else:
                print(f"- {html_file} (no changes)")
                skipped += 1
        except Exception as e:
            print(f"✗ {html_file}: {e}")
            errors += 1
    
    print(f"\n{'='*70}")
    print(f"Summary:")
    print(f"  Total files: {len(html_files)}")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")
    print(f"  Errors: {errors}")
    print(f"{'='*70}")


if __name__ == '__main__':
    main()
