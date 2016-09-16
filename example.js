var ly = require('./lib/loop-yield');


var itr = function(index) {
    console.log(index);
}

var itrDone = function() {
    console.log('done');
};


var a = new ly({
    totalItems: 1000000,
    iterator: itr,
    iterationDone: itrDone,
    yieldTime: 50,
    chunks: 100
});

a.loadBalancer();