
import re

def reorder_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start and end of the <main> tag
    main_start = content.find('<main>')
    main_end = content.rfind('</main>')
    
    if main_start == -1 or main_end == -1:
        print("Could not find <main> tags")
        return

    header_and_start = content[:main_start + 6]
    footer_and_end = content[main_end:]
    main_body = content[main_start + 6 : main_end]

    # Split the main body into sections. 
    # We look for <section ...> ... </section>
    # Using a regex to find all sections.
    section_pattern = re.compile(r'(<section.*?</section>)', re.DOTALL)
    all_sections = section_pattern.findall(main_body)
    
    # The "Final CTA" might be a section without an ID at the very end.
    # We need to identify each section.
    
    sections_map = {}
    
    # Identifiers for sections
    ids = {
        'home': 'id="home"',
        'about': 'id="about"',
        'contact': 'id="contact"',
        'problems': 'id="problems"',
        'services': 'id="services"',
        'roi': 'id="roi"',
        'chat_demo': 'id="chat-demo"',
        'engine': 'id="engine"',
        'integrations': 'id="integrations"',
        'how_it_works': 'id="how-it-works"',
        'faq': 'id="faq"',
    }
    
    # Special identifiers for sections without IDs
    specials = {
        'who_we_serve': 'aria-label="Real estate clients we serve in Pakistan"',
        'guarantees': 'aria-label="Service guarantees"',
        'founder': 'aria-label="Our Founder"',
        'final_cta': 'Ready to Automate Your' # Content based search for the final section
    }

    # Map sections to keys
    assigned_sections = []
    
    for section in all_sections:
        found = False
        # Check IDs
        for key, identifier in ids.items():
            if identifier in section:
                sections_map[key] = section
                found = True
                break
        
        if not found:
            # Check Specials
            for key, identifier in specials.items():
                if identifier in section:
                    sections_map[key] = section
                    found = True
                    break
        
        if not found:
            # If it's not any of the above, keep it as 'other'
            # This handles the final CTA if it doesn't match specials
            if 'Ready to Automate Your' in section:
                sections_map['final_cta'] = section
            else:
                # we'll just append it to a list of extras
                assigned_sections.append(section)

    # The Requested Order
    order = [
        'home',
        'who_we_serve',
        'problems',
        'services',
        'roi',
        'chat_demo',
        'engine',
        'integrations',
        'how_it_works',
        'about',
        'founder',
        'guarantees',
        'faq',
        'contact',
        'final_cta'
    ]
    
    reordered_main = []
    for key in order:
        if key in sections_map:
            reordered_main.append(sections_map[key])
    
    # Add any sections that weren't in the order list just in case
    processed_keys = set(order)
    for key, section in sections_map.items():
        if key not in processed_keys:
            reordered_main.append(section)

    final_html = header_and_start + "\n\n".join(reordered_main) + "\n\n" + footer_and_end
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)

if __name__ == "__main__":
    reorder_html()
