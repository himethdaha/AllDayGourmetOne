"use strict";
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long. Timeout after ${s} seconds`));
        }, s * 1000);
    });
};

//# sourceMappingURL=Index.919d417b.js.map
