export default function StopWatch() {
  let startTime,
    endTime,
    isRunning,
    duration = 0;

  this.start = function () {
    if (isRunning) throw new Error("StopWatch has already been started.");

    isRunning = true;

    startTime = new Date();
  };

  this.stop = function () {
    if (!isRunning) throw new Error("StopWatch has already been stop.");

    isRunning = false;

    endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function () {
    duration = 0;
    startTime = null;
    endTime = null;
    isRunning = false;
  };

  Object.defineProperty(this, "duration", {
    get: function () {
      return duration;
    },
  });
}

//
