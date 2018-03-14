// a. Initialize script, by default it tracks every input
hf = new howFast(); 

// b. You can also choose a selector to track specific fields
hf = new howFast('.js-search');

// c. Or pass your custom options
hf = new howFast('.js-search', {
  listener          :  'keyup',
  listenerReset     :  'blur',
  defaultDuration   :  250,
  minDuration       :  250,
  maxDuration       :  3500,
  resetAfter        :  100,
  selector          : 'input',
  rounder           :  50
});