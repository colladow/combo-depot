'use strict';

(function() {
	this.ComboDepot = {
		AUTHOR: 'Wilson Collado',
		VERSION: '0.1'
	};

  window.addEventListener('load', function() {
    var builder = new ComboDepot.Builder();
  }.bind(this));
}).call(this);
