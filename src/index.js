'use strict';
module.exports = function (opts) {

    const options = {
        totalItems: 1000,
        chunkSize: 100,
        yieldTime: 10,
        beforeIterator: () => {},
        iterator: (index) => {},
        afterIterator: () => {},
        iterationDone: () => {}
    };

    let iteratorCount = 0;

    const setOptions = function (opts) {
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

    setOptions(opts);

    const internalIterator = () => {
        let j = iteratorCount;
        let len = (iteratorCount + options.chunkSize);
        if (len > options.totalItems) {
            len = iteratorCount + (options.totalItems - iteratorCount);
        };

        if (options.beforeIterator) {
            options.beforeIterator();
        }
        while (j < len) {
            options.iterator(j);
            j++;
        }
        if (options.afterIterator) {
            options.afterIterator();
        }
        iteratorCount = j;

        if (iteratorCount === options.totalItems) {
            options.iterationDone();
            return;
        }

        setTimeout(() => {
            internalIterator();
        }, options.yieldTime);
    };

    this.loadBalancer = function () {
        internalIterator();
    };


};