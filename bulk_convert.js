const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\HP\\Downloads\\Landing Website\\Landing Website';
const targetDir = 'src/app';

const htmlFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html'));

function processHtml(fileName, htmlContent) {
    // Extract body content
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) {
        console.error(`No body tag found in ${fileName}`);
        return null;
    }

    let bodyHtml = bodyMatch[1];
    
    // Remove script tags from the HTML content
    bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // For index.html, apply the div closing fixes we found earlier
    if (fileName === 'index.html') {
        bodyHtml = bodyHtml.replace(
            /<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\s*<div class="text-center mb-16">\s*<span class="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions\?<\/span>/,
            '</div>\n\n<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\n            <div class="text-center mb-16">\n                <span class="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions?</span>'
        );
        bodyHtml = bodyHtml.replace(
            /Contact Support<\/a><\/p>\s*<\/div>\s*<\/div>\s*<\/section>/,
            'Contact Support</a></p>\n            </div>\n        </div>\n        </div>\n    </section>'
        );
    }
    // Check if other files have the same Got Questions section issue
    else {
        if(bodyHtml.match(/<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\s*<div class="text-center mb-16">\s*<span class="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions\?<\/span>/)) {
            // Check if there's a testimonial track
            if (bodyHtml.includes('id="testimonial-track"')) {
                bodyHtml = bodyHtml.replace(
                    /<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\s*<div class="text-center mb-16">\s*<span class="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions\?<\/span>/,
                    '</div>\n\n<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\n            <div class="text-center mb-16">\n                <span class="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions?</span>'
                );
                bodyHtml = bodyHtml.replace(
                    /Contact Support<\/a><\/p>\s*<\/div>\s*<\/div>\s*<\/section>/,
                    'Contact Support</a></p>\n            </div>\n        </div>\n        </div>\n    </section>'
                );
            }
        }
    }

    // Fix links: replace .html with Next.js routes
    // href="index.html" -> href="/"
    // href="about.html" -> href="/about"
    bodyHtml = bodyHtml.replace(/href="index\.html"/g, 'href="/"');
    bodyHtml = bodyHtml.replace(/href="([^"]+)\.html"/g, 'href="/$1"');

    if (fileName === 'cancellation.html') {
        bodyHtml = bodyHtml.replace(/"Account Settings" >/g, '"Account Settings" &gt;');
        bodyHtml = bodyHtml.replace(/"Billing" >/g, '"Billing" &gt;');
    }

    // Remove the Common Navbar block
    bodyHtml = bodyHtml.replace(/<!-- Common Navbar -->[\s\S]*?<!-- Mobile Menu -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

    // Basic replacements for JSX
    let jsx = bodyHtml
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/onclick=/g, 'onClick=')
        .replace(/rows="([^"]+)"/g, 'rows={$1}')
        .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
        .replace(/<br>/g, '<br />')
        .replace(/<hr>/g, '<hr />');

    // Handle self-closing tags
    jsx = jsx.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
    jsx = jsx.replace(/<source([^>]+?)(?<!\/)>/g, '<source$1 />');

    // Replace inline styles
    jsx = jsx.replace(/style="([^"]+)"/g, (match, styleString) => {
        const styles = styleString.split(';').filter(s => s.trim() !== '');
        const styleObj = {};
        styles.forEach(style => {
            const parts = style.split(':');
            if(parts.length >= 2) {
                let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                let value = parts.slice(1).join(':').trim();
                styleObj[key] = value;
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    // Reactify mobile menu
    jsx = jsx.replace(/onClick="document\.getElementById\('mobile-menu'\)\.classList\.toggle\('hidden'\)"/g, 'onClick={() => setMobileMenuOpen(!mobileMenuOpen)}');
    jsx = jsx.replace(/id="mobile-menu" class(Name)?="([^"]*?hidden[^"]*?)"/g, 'id="mobile-menu" className={`$2 ${!mobileMenuOpen ? "hidden" : ""}`.replace("hidden", "")}');

    const componentName = fileName === 'index.html' ? 'Home' : fileName.replace('.html', '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

    const finalComponent = `"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function ${componentName}() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Handle FAQ toggles
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        const handler = () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.faq-icon');
            
            if (!content) return;
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if(icon) icon.classList.add('rotate-180');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                content.classList.add('hidden');
                if(icon) icon.classList.remove('rotate-180');
                toggle.setAttribute('aria-expanded', 'false');
            }
        };
        toggle.addEventListener('click', handler);
        return () => toggle.removeEventListener('click', handler);
    });

    // Testimonials Scroll Controls
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    let autoPlay: ReturnType<typeof setInterval> | undefined;
    if (track && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const card = track.querySelector('div');
            return card ? card.offsetWidth + 24 : 340; 
        };
        
        const scrollPrev = () => {
            track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        };
        const scrollNext = () => {
            track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        };
        
        prevBtn.addEventListener('click', scrollPrev);
        nextBtn.addEventListener('click', scrollNext);
        
        let autoScrollDirection = 1;
        autoPlay = setInterval(() => {
            const step = getScrollStep();
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScroll - 10) {
                autoScrollDirection = -1;
            } else if (track.scrollLeft <= 10) {
                autoScrollDirection = 1;
            }
            track.scrollBy({ left: autoScrollDirection * step, behavior: 'smooth' });
        }, 5000);
        
        const stopAutoPlay = () => clearInterval(autoPlay);
        prevBtn.addEventListener('click', stopAutoPlay);
        nextBtn.addEventListener('click', stopAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay, { passive: true });
        track.addEventListener('mousedown', stopAutoPlay);
        
        return () => {
            clearInterval(autoPlay);
            prevBtn.removeEventListener('click', scrollPrev);
            nextBtn.removeEventListener('click', scrollNext);
            prevBtn.removeEventListener('click', stopAutoPlay);
            nextBtn.removeEventListener('click', stopAutoPlay);
            track.removeEventListener('touchstart', stopAutoPlay);
            track.removeEventListener('mousedown', stopAutoPlay);
        };
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <DynamicNavbar />
        ${jsx}
    </div>
  );
}
`;
    return finalComponent;
}

for (const file of htmlFiles) {
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    const jsx = processHtml(file, content);
    
    if (jsx) {
        let routeDir = targetDir;
        if (file !== 'index.html') {
            const folderName = file.replace('.html', '');
            routeDir = path.join(targetDir, folderName);
            if (!fs.existsSync(routeDir)) {
                fs.mkdirSync(routeDir, { recursive: true });
            }
        }
        
        fs.writeFileSync(path.join(routeDir, 'page.tsx'), jsx, 'utf8');
        console.log(`Wrote ${file} to ${path.join(routeDir, 'page.tsx')}`);
    }
}
