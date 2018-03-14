// In your keyup timeout use the hf.speed which dynamically
// sets the duration every time.

searchInput.addEventListener('keyup', function(e){
  clearTimeout(timer);

  timer = setTimeout(function(){
    // Do something
  }, hf.speed);
});