//function that display value
function dis(val) {
  let initial_value = document.getElementById("result").value;
  let new_value = initial_value + val;
  if (new_value === "0") {
    document.getElementById("result").value = "";
  } else {
    document.getElementById("result").value = new_value;
  }
}

// check if a number is a float
function isFloat(n) {
  return typeof n === "number" && n % 1 !== 0;
}

//function that evaluates the digit and return result
function solve() {
  let input = document.getElementById("result").value;
  input = input.replace("^", "**");
  try {
    let result = eval(input);
    // check if the result is a float or double
    let is_float = isFloat(result);
    if (is_float) {
      // ask user for precision
      let precision = window.prompt("What level of precision do you want", "1");
      // parse the result to precision
      result = parseFloat(result).toPrecision(parseInt(precision));
    }
    // display the result
    document.getElementById("result").value = result;
  } catch (e) {
    if (e instanceof SyntaxError) {
      // show the error component
      document.getElementById("error-component").style.display = "block";
      // display an error
      document.getElementById("error-component").innerText = e.message;
    }
  }
}

//function that clear the display
function clr() {
  // remove the value
  document.getElementById("result").value = "";
  // remove the error
  document.getElementById("error-component").innerText = "";
  document.getElementById("error-component").style.display = "none";
}

// event listener for uploading a file
document
  .getElementById("calculator-file-input")
  .addEventListener("change", function (e) {
    let file = e.target.files[0];
    let supported_types = ["text/plain", "application/pdf"];

    if (supported_types.indexOf(file.type) < 0) {
      // show the error component
      document.getElementById("error-component").style.display = "block";
      // display an error
      document.getElementById("error-component").innerText =
        "Only support .txt or .pdf files";

      return (e.target.files = null);
    }

    let reader = new FileReader();

    reader.onload = function (e) {
      // set the result value as per the data received:
      document.getElementById("result").value += e.target.result;
    };

    reader.readAsText(file);
  });
