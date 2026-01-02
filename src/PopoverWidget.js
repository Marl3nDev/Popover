export default class PopoverWidget {
  constructor() {
    this.popover = null;
    this.timeoutId = null;
  }

  showPopover(button, title, content, delay = 300) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      if (this.popover) {
        this.popover.remove();
      }

      this.popover = document.createElement('div');
      this.popover.className = 'popover';

      const popoverHeader = document.createElement('div');
      popoverHeader.className = 'popover-header';
      popoverHeader.textContent = title;

      const popoverBody = document.createElement('div');
      popoverBody.className = 'popover-body';
      popoverBody.textContent = content;

      const arrowElement = document.createElement('div');
      arrowElement.className = 'popover-arrow';

      this.popover.append(popoverHeader, popoverBody, arrowElement);
      document.body.append(this.popover);

      this.popover.style.visibility = 'hidden';
      this.popover.style.display = 'block';

      const popoverRect = this.popover.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const gap = 10;

      const top = buttonRect.top + window.scrollY - popoverRect.height - gap;
      const left = buttonRect.left + window.scrollX + buttonRect.width / 2;

      this.popover.style.top = `${top}px`;
      this.popover.style.left = `${left}px`;

      this.popover.style.visibility = 'visible';
    }, delay);
  }

  hidePopover() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.popover) {
      this.popover.style.display = 'none';
    }
  }
}
