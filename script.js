const inputs = Array.from(document.querySelectorAll('.code'));

// Focus first input on page load
window.addEventListener('load', () => {
  inputs[0].focus();
});

// Helper: move focus safely
function focusAt(i) {
  if (i >= 0 && i < inputs.length) inputs[i].focus();
}

// Handle input and navigation
inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, ''); // numeric only
    e.target.value = value;

    if (value && index < inputs.length - 1) {
      focusAt(index + 1);
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      if (input.value) {
        input.value = '';
      } else if (index > 0) {
        inputs[index - 1].value = '';
        focusAt(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusAt(index - 1);
    } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
      focusAt(index + 1);
    }
  });

  input.addEventListener('focus', () => input.select());
});
