// Initialize script
hf = new howFast('.js-search');

// Presentation demo
var requestTimer        =  null,
    timerDuration       =  hf.speed,
    searchInput         =  document.querySelector('.js-search'),
    searchResults       =  document.querySelector('.js-search-results'),
    spinner             =  document.querySelector('.js-spinner');

searchInput.addEventListener('keyup', function(e){
  clearTimeout(requestTimer);

  // Show hide results menu
  requestTimer = setTimeout(function(){
    // Show spinner
    spinner.style.display = "inline-block"

    setTimeout(function(){
        // Hide spinner
        spinner.style.display = "none"

        if (searchInput.value) {
            // Update result holder text
            document.querySelectorAll('.js-result-holder').forEach(function(holder){
                holder.innerHTML = searchInput.value;
            });

            searchResults.style.display = "block"
        } else {
            searchResults.style.display = "none"
        }
    }, 250);
  }, timerDuration);
});

searchInput.addEventListener('blur', function(e){
  searchResults.style.display = "none"
});

// Style code blocks
document.querySelectorAll('.js-code').forEach(function(pre){
    var src = pre.getAttribute('data-src');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {

            if (xhr.status < 400 && xhr.responseText) {

                var code = document.createElement('pre');
                code.classList.add('u-block');
                code.innerHTML = Prism.highlight(xhr.responseText, Prism.languages.javascript);

                // Replace input
                pre.parentNode.replaceChild(code, pre);
            }
        }
    };

    xhr.send(null);
});