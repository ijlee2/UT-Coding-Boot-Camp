// const is preferred over let whenever the value won't be completely reassigned

log(name); // output: 'undefined'

const tinyize = function(name) {
  log(name); // output: 'Rick'

  log(myName); // output: 'undefined'
  const myName = "Tiny " + name + "!";
  log(myName); // output: 'Tiny Rick!'

  return myName;
};

const name = tinyize("Rick");
log(name); // output: 'Tiny Rick!'
// log(myName); // output: ReferenceError: myName is not defined

// log(i); // output: ReferenceError: i is not defined
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    log(i); // output: 0, 1, 2, 3, 4
  }, 100);
}
// log(i); // output: ReferenceError: i is not defined

// helper function to log current line number
function log(string) {
  const callerLine = new Error().stack.split("\n")[2];
  const lineNumber = callerLine.match(/:(\d+):\d+\)/)[1];
  console.log("Line " + lineNumber + ": " + string);
}
