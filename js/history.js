'use strict';

(function(ComboDepot) {
	var History = function(target) {
		this._history = [];
		this._target = target;
	};

	History.prototype.push = function(node) {
		this._target.appendChild(node);
		this._history.push(node);
	};

	History.prototype.pop = function() {
		this._target.removeChild(this._history.pop());
	};

	History.prototype.purge = function() {
		this._history = [];
	};

	History.prototype.load = function(json, buildFn) {
		var data = JSON.parse(json);
		var node;
		var i;
		var l;

		for (i = 0, l = data.history.length; i < l; i += 1) {
			node = data.history[i];
			this.push(buildFn(node));
		}
	};

	History.prototype.toJSON = function(valueFn) {
		var data = { history: [] };
		var node;
		var i;
		var l;

		for (i = 0, l = this._history.length; i < l; i += 1) {
			node = this._history[i];
			data.history.push(valueFn(node));
		}

		return JSON.stringify(data);

	};

	ComboDepot.History = History;
}).call(this, this.ComboDepot);
