import DOMPurify from 'isomorphic-dompurify';

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (node.hasAttribute && node.hasAttribute('contenteditable')) {
    node.removeAttribute('contenteditable');
  }
  if (node.textContent && /^\s*edit\s*html\s*$/i.test(node.textContent) && (!node.children || node.children.length === 0)) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
});

const raw = '<div contenteditable="true">Hello <button>Edit HTML</button></div>';
const sanitized = DOMPurify.sanitize(raw);
console.log('Sanitized HTML:', sanitized);
