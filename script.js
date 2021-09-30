window.onload = function (e) {
  let stack = [];
  let fresh = true;

  const operationBtnsArray = document.getElementsByClassName("operators");

  const disableOperations = () => {
    for (let operationBtn of operationBtnsArray) {
      operationBtn.classList.add("inactive-operator");
      operationBtn.disabled = true;
    }
  };

  const enableOperations = () => {
    for (let operationBtn of operationBtnsArray) {
      operationBtn.classList.remove("inactive-operator");
      operationBtn.disabled = false;
    }
  };

  const displayContent = () => {
    let display = document.getElementById("display");
    let showCase = document.getElementById("showCase");
    return {
      display: display,
      content: display.textContent,
      showCase: showCase,
      showCaseContent: showCase.textContent,
    };
  };

  disableOperations();

  let digits = document.getElementsByClassName("digits");
  for (let digit of digits) {
    digit.addEventListener("click", function () {
      disableOperations();
      contentDisplay = displayContent();
      console.log("display", contentDisplay.content);
      if (fresh) {
        // stack.push(Number(contentDisplay.content));
        contentDisplay.display.textContent = digit.dataset.digit;
      } else {
        let contentDisplay = displayContent();
        if (contentDisplay.content === "0") contentDisplay.content = "";
        let newContent = contentDisplay.content + digit.dataset.digit;
        contentDisplay.display.textContent = newContent;
      }
      fresh = false;
    });
  }

  let decimal = document.getElementById("decimal");
  decimal.addEventListener("click", function () {
    disableOperations();
    contentDisplay = displayContent();
    let index = contentDisplay.content.indexOf(".");
    console.log("index", index);
    if (fresh) {
      stack.push(Number(contentDisplay.content));
      contentDisplay.display.textContent = "0.";
      fresh = false;
    } else if (index == -1) {
      let newContent = contentDisplay.content + ".";
      contentDisplay.display.textContent = newContent;
    }
  });

  for (let operationBtn of operationBtnsArray) {
    operationBtn.addEventListener("click", function () {
      let contentDisplay = displayContent();
      let lastNum = stack[stack.length - 1];
      let secondToLastNum = stack[stack.length - 2];
      console.log("lastNum", lastNum, secondToLastNum);
      let result = eval(`${secondToLastNum} ${this.dataset.operator} ${lastNum}`);
      contentDisplay.display.textContent = result.toString();
      stack.splice(-2, 2);
      console.log(typeof result);
      stack.push(result);
      contentDisplay.showCase.textContent = stack.toString().split(",").join(" ");
      if (stack.length >= 2) {
        enableOperations();
      } else {
        disableOperations();
      }
      fresh = true;
    });
  }

  let enterBtn = document.getElementById("enter");
  enterBtn.addEventListener("click", function () {
    let contentDisplay = displayContent();
    stack.push(Number(contentDisplay.content));
    contentDisplay.showCase.textContent = stack.length > 0 && stack.toString().split(",").join(" ");
    console.log(JSON.stringify(stack));
    if (stack.length >= 2) {
      enableOperations();
    } else {
      disableOperations();
    }
    fresh = true;
  });

  let clearBtn = document.getElementById("clear");
  clearBtn.addEventListener("click", function () {
    let contentDisplay = displayContent();
    contentDisplay.display.textContent = "0";
  });

  let resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function () {
    let contentDisplay = displayContent();
    disableOperations();
    contentDisplay.display.textContent = "0";
    contentDisplay.showCase.textContent = "0";
    stack = [];
    fresh = true;
  });
};
