const $callAPI = document.getElementById("call");
const $showResult = document.getElementById("result");

$callAPI.addEventListener("click", () => {
  $showResult.innerHTML = "Loading...";
  return fetch("https://the-one-api.herokuapp.com/v1/book")
    .then((res) => res.json())
    .then((books) => {
      console.log(books);
      $showResult.innerHTML = "";
      var $bookList = books.docs;
      $bookList.forEach(listBooks);
    });
});
function listBooks(item, index) {
  $showResult.innerHTML += (index += 1) + "- " + item.name + "<br>";
}
