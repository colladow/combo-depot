'use strict';

(function() {
	this.ComboDepot = {
		AUTHOR: 'Wilson Collado',
		VERSION: '0.1'
	};

  window.addEventListener('load', function() {
    var builder = new ComboDepot.Builder({
      base: '.combo-builder'
    });
  }.bind(this));
}).call(this);
