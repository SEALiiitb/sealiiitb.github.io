#!/usr/bin/env python3
"""
Script to standardize HTML files to proper HTML5 structure.
Fixes:
1. Remove XHTML-style self-closing slashes from void elements  
2. Convert onload attributes to modern JavaScript event listeners
3. Remove deprecated align attributes from images
"""

import re
from pathlib import Path

def fix_self_closing_tags(content):
    """Remove XHTML-style self-closing slashes from void elements."""
    # Fix meta tags
    content = re.sub(r'<meta([^>]*?)\s*/>', r'<meta\1>', content)
    # Fix link tags
    content = re.sub(r'<link([^>]*?)\s*/>', r'<link\1>', content)
    # Fix br tags
    content = re.sub(r'<br([^>]*?)\s*/>', r'<br\1>', content)
    # Fix hr tags
    content = re.sub(r'<hr([^>]*?)\s*/>', r'<hr\1>', content)
    # Fix input tags
    content = re.sub(r'<input([^>]*?)\s*/>', r'<input\1>', content)
    # Fix img tags
    content = re.sub(r'<img([^>]*?)\s*/>', r'<img\1>', content)
    return content

def fix_deprecated_attributes(content):
    """Remove deprecated HTML attributes from img tags."""
    # Remove align attribute from img tags
    content = re.sub(r'(<img[^>]*?)\s+align="[^"]*"', r'\1', content)
    return content

def convert_onload_to_eventlistener(content):
    """Convert onload attribute to modern event listener."""
    # More robust pattern that handles single quotes with content containing parentheses and double quotes
    # Match <body ... onload='...' ...> or <body ... onload="..." ...>
    body_pattern = r'<body([^>]*?)onload\s*=\s*(["\'])((?:(?!\2).)*)\2([^>]*)>'
    match = re.search(body_pattern, content, re.DOTALL)
    
    if match:
        before_onload = match.group(1).strip()
        onload_code = match.group(3)
        after_onload = match.group(4).strip()
        
        # Build new body tag without onload
        attrs = ' '.join(filter(None, [before_onload, after_onload]))
        if attrs:
            new_body_tag = f'<body {attrs}>'
        else:
            new_body_tag = '<body>'
        
        # Replace the body tag
        content = re.sub(body_pattern, new_body_tag, content, flags=re.DOTALL)
        
        # Add event listener script before </body>
        script = f'''
  <script>
    document.addEventListener('DOMContentLoaded', function() {{
      {onload_code}
    }});
  </script>
</body>'''
        content = content.replace('</body>', script)
    
    return content

def process_html_file(filepath):
    """Process a single HTML file."""
    print(f"Processing: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply fixes in order
        content = fix_self_closing_tags(content)
        content = fix_deprecated_attributes(content)
        content = convert_onload_to_eventlistener(content)
        
        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Updated")
            return True
        else:
            print(f"  - No changes needed")
            return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    """Main function to process all HTML files."""
    base_dir = Path('/Users/i339622/SAPDevelop/github.com/sealiiitb.github.io-issue-01')
    html_files = list(base_dir.rglob('*.html'))
    
    print(f"Found {len(html_files)} HTML files\n")
    print("="*60)
    
    updated_count = 0
    for html_file in sorted(html_files):
        if process_html_file(html_file):
            updated_count += 1
    
    print("="*60)
    print(f"\nSummary: Updated {updated_count} out of {len(html_files)} files")

if __name__ == '__main__':
    main()
