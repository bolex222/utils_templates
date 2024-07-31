class ScreenManager {
  width = 0;
  height = 0;
  dpr = 1;

  subscribers = [];

  constructor() {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", this.handleResize);
    const resizeObserver = new ResizeObserver(this.handleResize);
    resizeObserver.observe(document.body);
  }

  handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio;
    this.notifyAllSubscribers();
  };

  notifyAllSubscribers = () => {
    for (const subscriber of this.subscribers) {
      subscriber(this.width, this.height, this.dpr);
    }
  };

  subscribe = (callback) => {
    this.unsubscribe(callback);
    this.subscribers.push(callback);
  };

  unsubscribe = (callback) => {
    this.subscribers = this.subscribers.filter(
      (subscriber) => callback !== subscriber,
    );
  };
}

const screenManger = new ScreenManager();
export default screenManger;
