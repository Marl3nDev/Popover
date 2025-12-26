import PopoverWidget from '../src/PopoverWidget';

describe('PopoverWidget', () => {
  let popover;
  let button;

  beforeEach(() => {
    document.body.innerHTML = '';
    button = document.createElement('button');
    document.body.appendChild(button);
    popover = new PopoverWidget();
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('создает popover при клике', () => {
    popover.showPopover(button, 'Заголовок', 'Текст подсказки', 0);
    jest.runAllTimers();

    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).not.toBeNull();
    expect(popoverElement.style.display).toBe('block');
  });

  test('удаляет popover при вызове hidePopover', () => {
    popover.showPopover(button, 'Заголовок', 'Текст', 0);
    jest.runAllTimers();

    popover.hidePopover();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.style.display).toBe('none');
  });

  test('правильно позиционирует popover', () => {
    button.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 100,
      height: 40,
      toJSON: () => {},
    }));

    popover.showPopover(button, 'Заголовок', 'Текст', 0);
    jest.runAllTimers();

    const popoverElement = document.querySelector('.popover');

    expect(popoverElement.style.top).toBeTruthy();
    expect(popoverElement.style.left).toBeTruthy();
    expect(popoverElement.style.display).toBe('block');
  });
});
