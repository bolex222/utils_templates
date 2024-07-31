// INSTALL stats.js and uncomment relative lines if you want the performance indicator
// import Stats from "stats.js";

class Ticker {
  subscribers = [];
  // stats;
  currentRaf = null;
  frame = 0;
  previouseTime = 0;

  constructor() {
    // if (window.location.hash === "#debug") {
    //   this.stats = new Stats();
    //   document.body.appendChild(this.stats.dom);
    // }
    this.currentRaf = requestAnimationFrame(this.tick);
  }

  subscribe = (callback, priority = undefined) => {
    this.subscribers.push({
      callback,
      priority: priority !== undefined ? priority : this.subscribers.length,
    });
    this.sortSubscribers();
  };

  unsubscribe = (callback) => {
    this.subscribers = this.subscribers.filter((c) => c.callback !== callback);
  };

  sortSubscribers = () => {
    this.subscribers.sort((a, b) => a.priority - b.priority);
  };

  tick = (time) => {
    // this.stats?.begin();
    const deltaTime = time - this.previouseTime;
    this.frame++;
    for (const s of this.subscribers) {
      s.callback(time, deltaTime, this.frame);
    }
    this.previouseTime = time;
    // this.stats?.end();
    this.currentRaf = requestAnimationFrame(this.tick);
  };

  kill = () => {
    if (this.currentRaf !== null) cancelAnimationFrame(this.currentRaf);
    this.subscribers = [];
  };
}

const globalTicker = new Ticker();
export default globalTicker;
