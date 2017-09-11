var ly = require('./lib/loop-yield');


var itr = function (index) {
    console.log('a' + index);
}

var itrDone = function () {
    console.log('done');
};


var a = new ly({
    totalItems: 127,
    beforeIterator: () => {

    },
    iterator: itr,
    afterIterator: () => {

    },
    iterationDone: itrDone,
    yieldTime: 500,
    chunkSize: 10
});

a.loadBalancer();

var b = new ly({
    totalItems: 1000,
    iterator: (index) => {
        console.log('b ' + index);
    },
    iterationDone: itrDone,
    yieldTime: 500,
    chunkSize: 25
});

b.loadBalancer();