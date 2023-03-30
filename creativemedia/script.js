var player = videojs("preview-player");

player.poster(
  "https://raw.githubusercontent.com/donelfantastic/donelfantastic.github.io/main/assets/dftv.gif"
);
videojs(document.querySelector("video")).playlistUi();

//show & hide menu 1
$(document).ready(function () {
  $(".button").click(function () {
    $(".vjs-playlist").toggle(1000);
  });
});