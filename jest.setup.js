global.CSS = { supports: () => false };

Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
  value: jest.fn(() => ({
    top: 0,
    left: 0,
    width: 100,
    height: 20,
    bottom: 20,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
  })),
  writable: true,
});
