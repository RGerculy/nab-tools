/**
 * Tiny global toast: dispatch a DOM event; ToastHost renders the bar.
 * Kept framework-free so utils (clipboard) can trigger it without React.
 */
export function showToast(message: string): void {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { message } }));
}
