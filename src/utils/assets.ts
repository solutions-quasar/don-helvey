/**
 * Resolves an asset path to the correct absolute URL,
 * ensuring subpaths (like /don-helvey/realtor-closing-protection/)
 * never produce broken relative image links on GitHub Pages.
 */
export function getAssetUrl(relativePath: string): string {
  // Strip leading ./ or /
  let clean = relativePath.trim();
  if (clean.startsWith('./')) {
    clean = clean.slice(2);
  }
  if (clean.startsWith('/')) {
    clean = clean.slice(1);
  }

  // Check if hosted on GitHub Pages (*.github.io) or subpath /don-helvey
  const isGitHubPages = typeof window !== 'undefined' && (
    window.location.hostname.endsWith('github.io') ||
    window.location.pathname.startsWith('/don-helvey')
  );
  const base = isGitHubPages ? '/don-helvey/' : '/';

  return `${base}${clean}`;
}
