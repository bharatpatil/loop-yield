'use strict';
module.exports = function(opts) {

    const options = {
        totalItems: 1000,
        chunkSize: 100,
        yieldTime: 10,
        iterator: (index) => {},
        iterationDone: () => {}
    };

    let iteratorCount = 0;
    let timerInstance;

    this.setOptions = function(opts) {
        if (opts) {
            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    if (opts[key]) {
                        options[key] = opts[key];
                    }
                }
            }
        }
        iteratorCount = 0;
        return this;
    };

    this.setOptions(opts);

    this.loadBalancer = function() {
        let j = iteratorCount;
        let len = (iteratorCount + options.chunkSize);
        if (len > options.totalItems) {
            len = iteratorCount + (options.totalItems - iteratorCount);
        };

        while (j < len) {
            options.iterator(j);
            j++;
        }
        iteratorCount = j;

        if (iteratorCount === options.totalItems) {
            options.iterationDone();
            return;
        }

        let that = this;
        timerInstance = setTimeout(function() {
            that.loadBalancer.apply(that);
        }, options.yieldTime);
    };


};