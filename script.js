// script.js
const inputs = Array.from(document.querySelectorAll('.code'));

// Ensure first input is focused on load (so cy.focused() has a subject)
window.addEventListener('DOMContentLoaded', () => {
  const first = document.getElementById('code-1');
  if (first) first.focus();
});

// Utility: move focus by index safely
function focusAt(i) {
  if (i >= 0 && i < inputs.length) inputs[i].focus();
}

// Distribute pasted digits across inputs starting from index
function fillDigitsFrom(index, str) {
  const digits = str.replace(/\D/g, '');
  let i = index;
  for (const ch of digits) {
    if (i >= inputs.length) break;
    inputs[i].value = ch;
    i++;
  }
  const nextEmpty = inputs.findIndex(inp => inp.value === '');
  if (nextEmpty !== -1) focusAt(nextEmpty);
  else focusAt(inputs.length - 1);
}

inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    let v = e.target.value;

    // Handle paste of multiple chars
    if (v.length > 1) {
      fillDigitsFrom(index, v);
      return;
    }

    // Keep only one numeric character
    v = v.replace(/\D/g, '');
    e.target.value = v;

    // Auto-advance on valid digit
    if (v && index < inputs.length - 1) {
      focusAt(index + 1);
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      // If current has a value, clear it and keep focus here
      if (input.value) {
        input.value = '';
        return;
      }
      // If current is empty, move to previous, clear it, and focus there
      if (index > 0) {
        e.preventDefault();
        const prev = inputs[index - 1];
        prev.value = '';
        focusAt(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) {
        e.preventDefault();
        focusAt(index - 1);
      }
    } else if (e.key === 'ArrowRight') {
      if (index < inputs.length - 1) {
        e.preventDefault();
        focusAt(index + 1);
      }
    }
  });

  // Select existing value on focus for quick overwrite
  input.addEventListener('focus', () => {
    input.select?.();
  });
});
