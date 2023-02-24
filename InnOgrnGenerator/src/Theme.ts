'use strict';

namespace InnKppCalculator {
    function setTheme (): void {
        let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
    }

    export function initTheme(): void {
        setTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
    }
}