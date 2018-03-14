{
  // @type: String
  // @accepts: keyup, keydown
  // The listener that hf should capture the keystrokes
  listener          :  'keyup',

  // @type: String
  // @accepts: blur, mouseout etc
  // This is when hf stops tracking keystrokes
  listenerReset     :  'blur', 
  
  // @type: Number
  // @accepts: values in milliseconds
  // This is the initial value of hf.time
  defaultDuration   :  250, 
  
  // @type: Number
  // @accepts: values in milliseconds
  // If a keystroke takes less than 250ms, count it as 250
  // This is our minimum typing speed
  minDuration       :  250, 
  
  // @type: Number
  // @accepts: values in milliseconds
  // If a keystroke takes more than 3500ms, count it as 3500
  // This helps to avoid miscalculation on long pauses 
  maxDuration       :  3500,
  
  // @type: Number
  // @accepts: values in milliseconds
  // Every how many times reset the counter
  // Keep it relatively small because users become better
  // on typing
  resetAfter        :  100,
  
  // @type: String
  // @accepts: input, textarea, .my-class, #some-id
  // The selector that howFast tracks keystrokes
  selector          : 'input',
  
  // @type: Number
  // It rounds the typing speed every 50 ms
  // ex. 250 or 300 or 350, never 232ms
  rounder           :  50
}