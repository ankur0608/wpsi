"use client";
import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // Handle FAQ toggles
    const toggles = document.querySelectorAll('.faq-toggle');
    const handlers = new Map();

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
        handlers.set(toggle, handler);
        toggle.addEventListener('click', handler);
    });

    // Testimonials Scroll Controls
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    let autoPlay: NodeJS.Timeout;
    let scrollPrev: () => void, scrollNext: () => void, stopAutoPlay: () => void;

    if (track && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const card = track.querySelector('div');
            return card ? card.offsetWidth + 24 : 340; 
        };
        
        scrollPrev = () => {
            track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        };
        scrollNext = () => {
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
        
        stopAutoPlay = () => clearInterval(autoPlay);
        prevBtn.addEventListener('click', stopAutoPlay);
        nextBtn.addEventListener('click', stopAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay, { passive: true });
        track.addEventListener('mousedown', stopAutoPlay);
    }

    return () => {
        toggles.forEach(toggle => {
            const handler = handlers.get(toggle);
            if (handler) {
                toggle.removeEventListener('click', handler);
            }
        });
        if (track && prevBtn && nextBtn) {
            clearInterval(autoPlay);
            prevBtn.removeEventListener('click', scrollPrev);
            nextBtn.removeEventListener('click', scrollNext);
            prevBtn.removeEventListener('click', stopAutoPlay);
            nextBtn.removeEventListener('click', stopAutoPlay);
            track.removeEventListener('touchstart', stopAutoPlay);
            track.removeEventListener('mousedown', stopAutoPlay);
        }
    };
  }, []);

  return null;
}
