const arr = ["0.47", "69", "+", "11", "*", "79", "/"];

console.log(evalRPN(arr));

//integer check
function isInteger(str) {
  return /^[-+]?\d+$/.test(str);
}

//float check
function isFloat(str) {
  return /^[-+]?\d+(\.\d+)?$/.test(str);
}
//calc function
function evalRPN(array) {
  const stack = [];
  const operators = {
    "+": (numb1, numb2) => {
      return numb1 + numb2;
    },
    "-": (numb1, numb2) => {
      return numb1 - numb2;
    },
    "*": (numb1, numb2) => {
      return numb1 * numb2;
    },
    "/": (numb1, numb2) => {
      return numb1 / numb2;
    },
  };

  for (let elements of array) {
    if (operators[elements]) {
      let numb2 = stack.pop();
      let numb1 = stack.pop();
      stack.push(operators[elements](numb1, numb2));
    } else {
      if (isInteger(elements)) {
        stack.push(parseInt(elements));
      } else {
        stack.push(parseFloat(elements));
      }
    }
  }
  return Math.round(stack.pop() * 1000) / 1000;
}

const displayArea = document.getElementById("displayWindow");
let btns = document.querySelectorAll("button");

for (i of btns) {
  i.addEventListener("click", function () {
    console.log(this.id);
  });
}
