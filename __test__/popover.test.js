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
    const buttonRect = {
      top: 100,
      left: 100,
      width: 100,
      height: 40,
    };
    const popoverRect = {
      width: 200,
      height: 80,
    };
    const gap = 10;

    // Мокаем getBoundingClientRect в ПРАВИЛЬНОМ ПОРЯДКЕ
    // В коде сначала вызывается для popover, потом для button
    Element.prototype.getBoundingClientRect = jest.fn()
      .mockReturnValueOnce(popoverRect) // Первый вызов для popover
      .mockReturnValueOnce(buttonRect); // Второй вызов для кнопки

    // Вызываем метод ОДИН РАЗ
    popover.showPopover(button, 'Test', 'Content', 0);
    jest.runAllTimers();

    // Находим реальный popover в DOM
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).not.toBeNull();

    // Проверяем результат
    const expectedTop = buttonRect.top - popoverRect.height - gap;
    const expectedLeft = buttonRect.left + buttonRect.width / 2;

    expect(popoverElement.style.top).toBe(`${expectedTop}px`);
    expect(popoverElement.style.left).toBe(`${expectedLeft}px`);

    // Очищаем мок
    jest.restoreAllMocks();
  });
});
