// 1. Najdeme všechny prvky, které chceme rozhýbat
const counters = document.querySelectorAll('.counter');

// 2. Vytvoříme hlídače scrollování
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        
        // Pokud prvek právě vjel na obrazovku
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target')); // Cílové číslo z HTML
            let count = 0; // Začínáme od nuly
            
            // 3. Funkce pro samotné počítání
            const updateCount = () => {
                const speed = 40; // Rychlost načítání (čím menší, tím rychlejší)
                const increment = target / speed;
                
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count); // Zaokrouhlení nahoru a propsání do HTML
                    setTimeout(updateCount, 30); // Počkej 30ms a zkus to znovu
                } else {
                    counter.innerText = target; // Pojistka: jakmile jsme v cíli, napiš přesné číslo
                }
            };
            
            updateCount(); // Spustíme počítání
            observer.unobserve(counter); // Přestaneme prvek sledovat, máme hotovo
        }
    });
}, { threshold: 0.5 }); // Spustí se až ve chvíli, kdy je z prvku vidět aspoň 50 %

// 4. Předáme všechny naše čítače hlídači ke sledování
counters.forEach(counter => {
    observer.observe(counter);
});