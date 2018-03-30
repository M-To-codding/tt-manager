export default class TimerHandler {
  static create(args) {
    if (this.__interval == null) {
      this.initializeInterval();
    }

    if (this.timeHolders == null) {
      this.timeHolders = [];
    }

    let timeHolder = this.createOrFindTimeHolder(args);

    return {
      start: () => {timeHolder.needCount = true},
      stop: () => {timeHolder.needCount = false}
    }
  }

  static initializeInterval() {
    this.__interval = setInterval(
      () => {
        this.doUpdate()
      }, 1000
    )
  }

  static doUpdate() {
    this.timeHolders.forEach((timeHolder) => {
      if(timeHolder.needCount) {
        timeHolder.seconds++;
        timeHolder.callback({seconds: timeHolder.seconds})
      }
    })
  }

  static createOrFindTimeHolder(args) {
    let existingTimeHolder = this.timeHolders.find((existing) => existing.id == args.id);
    if(existingTimeHolder == null) {
      let timeHolder = this.createTimeHolder(args);
      this.timeHolders.push(timeHolder);
      return timeHolder;
    } else {
      existingTimeHolder.callback = args.callback;
      return existingTimeHolder;
    }
  }

  static createTimeHolder(args) {
    return {
      id: args.id,
      callback: args.callback,
      needCount: false,
      seconds: 0
    }
  }
}
