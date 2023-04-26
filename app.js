function asyncProcess(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(`入力値: ${value}`);
      } else {
        reject("入力は空です。");
      }
    }, 500);
  });
}

const sendButton = document.getElementById("sendButton");
const input = document.getElementById("textBox");
sendButton.addEventListener("click", enterName);

function enterName() {
  asyncProcess(input.value)
    .then((response) => console.log(response))
    .catch((error) => console.log(`エラー：${error}`))
    .finally(() => console.log("処理終了"));
}

const sendButton2 = document.getElementById("sendButton2");
const input2 = document.getElementById("textBox2");
sendButton2.addEventListener("click", enterName2);

function enterName2() {
  asyncProcess(input2.value)
    .then((response) => {
      console.log(response);
      const promptInput = prompt("名字を入力してください");
      return asyncProcess(promptInput);
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(`エラー：${error}`))
    .finally(() => console.log("処理終了"));
}

Promise.all([
  asyncProcess("This is"),
  asyncProcess("a test for"),
  asyncProcess("Promise all"),
  // asyncProcess(),
])
  .then((response) => console.log(response))
  .catch((error) => console.log(`エラー：${error}`));

Promise.allSettled([
  asyncProcess("Success A"),
  asyncProcess("Success B"),
  asyncProcess(""),
])
  .then((response) => console.log(response))
  .catch((error) => console.log(`エラー：${error}`));

Promise.race([asyncProcess("aa"), asyncProcess(""), asyncProcess("ii")])
  .then((response) => console.log(response))
  .catch((error) => console.log(`エラー： ${error}`));

Promise.any([
  asyncProcess(""),
  asyncProcess(""),
  asyncProcess("Success!"),
  asyncProcess("Success 2!"),
])
  .then((response) => console.log(response))
  .catch((error) => console.log(`エラー：${error}`));

function asyncProcess2(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num == "number") {
        resolve(num ** 2);
      } else {
        reject("引数は数値でなければなりません。");
      }
    }, 500);
  });
}
async function main(num) {
  let result1 = await asyncProcess2(num);
  let result2 = await asyncProcess2(result1);
  let result3 = await asyncProcess2(result2);
  return result3;
}
main(6)
  .then((response) => console.log(response))
  .catch((error) => console.log(`エラー：${error}`));
