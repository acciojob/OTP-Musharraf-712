// script.js
const inputs = Array.from(document.querySelectorAll('.code'));

// Ensure first input is focused on load
window.addEventListener('DOMContentLoaded', () => {
  const first = document.getElementById('code-1');
  if (first) first.focus();
});

// Helper: move focus safely by index
function focusAt(i) {
  if (i >= 0 && i < inputs.length) inputs[i].focus();
}

// Distribute a string of digits starting at a given index
function fillDigitsFrom(index, str) {
  let i = index;
  for (const ch of str.replace(/\D/g, '').slice(0, inputs.length - index)) {
    inputs[i].value = ch;
    i++;
    if (i >= inputs.length) break;
  }
  // Focus next empty slot or last
  const nextEmpty = inputs.findIndex((inp) => inp.value === '');
  if (nextEmpty !== -1) {
    focusAt(nextEmpty);
  } else {
    focusAt(inputs.length - 1);
  }
}

inputs.forEach((input, index) => {
  // Only allow a single digit; auto-advance; handle paste sequences
  input.addEventListener('input', (e) => {
    let v = e.target.value;
    // If user pasted multiple chars, distribute
    if (v.length > 1) {
      fillDigitsFrom(index, v);
      return;
    }
    // Keep only one numeric character
    v = v.replace(/\D/g, '');
    e.target.value = v;
    if (v && index < inputs.length - 1) {
      focusAt(index + 1);
    }
  });

  // Handle navigation and deletion logic
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      if (input.value) {
        // Delete current value first; keep focus here
        input.value = '';
        // After clearing, place caret here (for visual consistency)
        return;
      }
      // If current empty, move to previous and clear it
      if (index > 0) {
        e.preventDefault(); // prevent browser default
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
