document.getElementById("card-remove").addEventListener("click", function () {
  document.getElementById("collapseExample").remove();
});
function appSeaBtn() {
  document.querySelector(".m-search").classList.toggle("m-active");
}
// m menu
function seeMenuBtn() {
  document.querySelector(".sec-menu").classList.toggle("active");
}
function removeMenu() {
  document.querySelector(".sec-menu").classList.remove("active");
}
