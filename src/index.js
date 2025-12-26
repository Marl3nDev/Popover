import PopoverWidget from './PopoverWidget';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const popover = new PopoverWidget();
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { title } = button.dataset;
      const { content } = button.dataset;
      const delay = parseInt(button.dataset.delay, 10) || 300;

      if (popover.popover && popover.popover.style.display === 'block') {
        popover.hidePopover();
      } else {
        popover.showPopover(button, title, content, delay);
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn') && !e.target.closest('.popover')) {
      popover.hidePopover();
    }
  });
});
