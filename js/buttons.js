'use strict';

(function(ComboDepot) {

  var BUTTONS = {
    STICK: [
      'up',
      'down',
      'back',
      'forward',
      'up-forward',
      'up-back',
      'down-forward',
      'down-back',
      'half-circle-back',
      'half-circle-forward',
      'quarter-circle-back',
      'quarter-circle-forward',
      'dragon-punch',
      'reverse-dragon-punch',
      'neutral'
    ],
    SSF4: [
      'jab',
      'strong',
      'fierce',
      'short',
      'forward',
      'roundhouse',
      'three-punch',
      'three-kick',
      'kick',
      'punch'
    ],
    UMVC3: [
      'light',
      'medium',
      'heavy',
      'special',
      'attack'
    ]
  };

  function generateClasses() {
    var i;
    var l;
    var o;
    var prefix;
    var set;
    var className;
    var classes = {};

    for (o in BUTTONS) {
      prefix = o.toLowerCase();
      set = BUTTONS[o];

      for (i = 0, l = set.length; i < l; i += 1) {
        className = prefix + '-' + set[i];

        classes[className] = prefix;
      }
    }

    return classes;
  };

  ComboDepot.BUTTONS = BUTTONS;
	ComboDepot.CLASSES = generateClasses();

}).call(this, this.ComboDepot);
