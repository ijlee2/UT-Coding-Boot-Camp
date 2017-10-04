let name;

const tinyize = function (name) {
  // const should be preferred when the value won't be reassigned
  const myName = 'Tiny ' + name + '!';

  return myName;
};

// Name can be reassigned since it's using let
name = tinyize("Rick");
console.log(name);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // output: 0, 1, 2, 3, 4
  }, 100);
}
