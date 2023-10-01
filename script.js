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
    // console.log("val", this.value);
    switch (this.id) {
      case "num1": {
        displayArea.value += "1";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num2": {
        displayArea.value += "2";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num3": {
        displayArea.value += "3";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num4": {
        displayArea.value += "4";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num5": {
        displayArea.value += "5";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num6": {
        displayArea.value += "6";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num7": {
        displayArea.value += "7";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num8": {
        displayArea.value += "8";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num9": {
        displayArea.value += "9";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "num0": {
        displayArea.value += "0";
        displayArea.scrollLeft = 100000;
        break;
      }
      case "addBtn": {
        if (displayArea.value.trim() !== "") {
          displayArea.value += "+";
          displayArea.scrollLeft = 100000;
        }
        break;
      }
      case "subBtn": {
        if (displayArea.value.trim() !== "") {
          displayArea.value += "-";
          displayArea.scrollLeft = 100000;
        }
        break;
      }
      case "multBtn": {
        if (displayArea.value.trim() !== "") {
          displayArea.value += "*";
          displayArea.scrollLeft = 100000;
        }
        break;
      }
      case "slashBtn": {
        if (displayArea.value.trim() !== "") {
          displayArea.value += "/";
          displayArea.scrollLeft = 100000;
        }
        break;
      }
      case "dotBtn": {
        if (displayArea.value.trim() !== "") {
          displayArea.value += ".";
          displayArea.scrollLeft = 100000;
        }
        break;
      }
      case "delBtn": {
        if (displayArea.value == "Infinity" || displayArea.value == "NaN") {
          displayArea.value = "";
        } else {
          displayArea.value = displayArea.value.slice(0, -1);
        }
        displayArea.scrollLeft = 100000;
        break;
      }
      case "resetBtn": {
        displayArea.value = "";
        break;
      }
      case "evalBtn": {
        // console.log(eval(displayArea.value));
        console.log(parseString(displayArea.value));
        const validOut = parseString(displayArea.value);
        console.log(validateExpression(validOut));
        if (validateExpression(validOut)) {
          displayArea.value = evalRPN(SYA(validOut));
        } else {
          displayArea.value = "invalid expression";
        }
        displayArea.scrollLeft = 100000;
        break;
      }
    }
  });
}
// function parseString(string) {
//   const regex = /(\d+(\.\d*)?|\.\d+|[+\-*/])/g;
//   const matches = string.match(regex);
//   return matches || [];
// }
// added handling of negitive numbers
function parseString(string) {
  const pattern = /([-+*/])|([0-9.]+)/g;
  const result = string.match(pattern) || [];
  for (let i = 0; i < result.length; i++) {
    if (
      result[i] === "-" &&
      (i === 0 || ["+", "-", "*", "/"].includes(result[i - 1]))
    ) {
      result[i] += result[i + 1];
      result.splice(i + 1, 1);
    }
  }

  return result;
}

function getType(element) {
  if (
    element === "+" ||
    element === "-" ||
    element === "*" ||
    element === "/"
  ) {
    return "operator";
  } else if (!isNaN(parseFloat(element))) {
    return "number";
  } else {
    return "other";
  }
}

function validateExpression(arr) {
  let prevType = getType(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    const currentType = getType(arr[i]);
    if (currentType === prevType) {
      return false;
    }

    prevType = currentType;
  }

  return true;
}

function SYA(array) {
  const stack = [];
  const queue = [];
  const operators = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };

  for (const element of array) {
    if (getType(element) === "number") {
      queue.push(element);
    } else if (getType(element) === "operator") {
      while (
        stack.length > 0 &&
        operators[stack[stack.length - 1]] >= operators[element]
      ) {
        queue.push(stack.pop());
      }
      stack.push(element);
    }
  }
  while (stack.length > 0) {
    queue.push(stack.pop());
  }

  return queue;
}
