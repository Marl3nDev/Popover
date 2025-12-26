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
      if (!this.popover) {
        this.popover = document.createElement('div');
        this.popover.className = 'popover';

        const popoverHeader = document.createElement('div');
        popoverHeader.className = 'popover-header';
        popoverHeader.textContent = title;

        const popoverBody = document.createElement('div');
        popoverBody.className = 'popover-body';
        popoverBody.textContent = content;

        const arrow = document.createElement('div');
        arrow.className = 'popover-arrow';

        this.popover.append(popoverHeader, popoverBody, arrow);
        document.body.appendChild(this.popover);
      }

      const buttonRect = button.getBoundingClientRect();
      const popoverRect = this.popover.getBoundingClientRect();

      const top = buttonRect.top - popoverRect.height - 10;
      const left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2;

      this.popover.style.top = `${top}px`;
      this.popover.style.left = `${left}px`;
      this.popover.style.display = 'block';
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
