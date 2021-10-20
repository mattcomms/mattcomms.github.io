$(document).ready(function() {
  var pixelToMove = 20;
  $("#halloween-background").mousemove(function(e) {
    var width = $(this).innerWidth();
    var height = $(this).innerHeight();
    var newValueX = (e.pageX / width) * pixelToMove;
    var newValueY = (e.pageY / height) * pixelToMove;
    $(this).css('background-position', newValueX + '%' + ' ' + newValueY + '%');
  });
});
