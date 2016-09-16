'use strict';
module.exports = function(opts) {

    const options = {
        totalItems: 1000,
        chunks: 100,
        yieldTime: 10,
        iterator: (index) => {},
        iterationDone: () => {}
    };

    let arrTotalChuncks = [];
    let chunckCount = 0;
    let iteratorCount = 0;

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

        arrTotalChuncks = [];
        chunckCount = 0;
        iteratorCount = 0;

        for (let j = 0, len = options.chunks; j < len; j++) {
            arrTotalChuncks[j] = Math.floor(options.totalItems / options.chunks);
        }
        for (let j = 0, len = (options.totalItems % options.chunks); j < len; j++) {
            arrTotalChuncks[j] += 1;
        }
    };

    this.setOptions(opts);

    this.loadBalancer = function() {
        let j = iteratorCount;
        const len = (iteratorCount + arrTotalChuncks[chunckCount])
        while (j < len) {
            options.iterator(j);
            j++;
        }

        chunckCount++;
        iteratorCount = j;

        if (iteratorCount === options.totalItems) {
            options.iterationDone();
            return;
        }

        let that = this;
        setTimeout(function() {
            that.loadBalancer.apply(that);
        }, options.yieldTime);
    };


};