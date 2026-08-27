/**
 * Clipboard helper with fallback for insecure contexts (plain HTTP) and
 * older mobile browsers where navigator.clipboard is unavailable or blocked.
 *
 * Modern API requires a secure context (HTTPS/localhost); over plain HTTP
 * mobile browsers silently fail. The legacy path (hidden textarea +
 * document.execCommand('copy')) works in user-gesture handlers anywhere.
 */
import { showToast } from './toast';

export function copyText(text: string): Promise<boolean> {
  // Legacy path first: execCommand must run synchronously inside the user
  // gesture to be reliable on iOS/Android over HTTP.
  if (!navigator.clipboard || !window.isSecureContext) {
    const ok = legacyCopy(text);
    notifyResult(ok);
    return Promise.resolve(ok);
  }
  return navigator.clipboard.writeText(text).then(
    () => {
      notifyResult(true);
      return true;
    },
    () => {
      const ok = legacyCopy(text);
      notifyResult(ok);
      return ok;
    },
  );
}

function notifyResult(ok: boolean) {
  showToast(ok ? 'Copied to clipboard' : 'Copy failed — try again');
}

function legacyCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    // Prevent iOS Safari from zooming when focusing the hidden field
    textarea.style.fontSize = '12pt';
    document.body.appendChild(textarea);

    const selection = window.getSelection();
    const originalRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);

    // Restore the user's selection
    if (originalRange && selection) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    return ok;
  } catch {
    return false;
  }
}
