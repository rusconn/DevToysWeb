/**
 * A script that runs immediately in the head to set the initial theme
 * and prevent flashing during page load.
 */
export function ThemeScript() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Need to initialize theme to avoid flash
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              const saved = localStorage.getItem('theme');
              if (saved && saved !== 'system') return saved;
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            const theme = getTheme();
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.style.colorScheme = theme;
          })()
        `,
      }}
    />
  );
}
