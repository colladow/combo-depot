'use strict';

(function(ComboDepot) {
  var noop = function() {};

  /**
  * The History class wraps an Array and provides convenient callbacks
  * for reacting to changes in the history.
  *
  * @class History
  * @constructor
  * @param {Object} opts Options to configure the History object.
  */
	var History = function(opts) {
		this._history  = [];
    this._onPush   = opts.onPush    || noop;
    this._onPop    = opts.onPop     || noop;
    this._onRemove = opts.onRemove  || noop;
	};

  /**
  * Push a new node into the history.
  *
  * @method push
  * @param {*} node A thing to store in history.
  * @param {Function} callback An optional callback function to override onPush.
  * @public
  */
	History.prototype.push = function(node, callback) {
		this._history.push(node);
    callback = callback || this._onPush;
    callback(node);
	};

  /**
  * Pops the last event off the history.
  *
  * @method pop
  * @param {Function} callback An optional callback to override onPop.
  * @public
  */
	History.prototype.pop = function(callback) {
    callback = callback || this._onPop;
		callback(this._history.pop());
	};

  /**
  * Removes a specific node from the history.
  *
  * @method remove
  * @param {*} node The thing to be removed from history.
  * @param {Function} callback An optional callback to override onRemove.
  * @public
  */
  History.prototype.remove = function(node, callback) {
    var index = this._history.indexOf(node);

    if (index === -1) {
      return;
    }

    callback = callback || this._onRemove;
    this._history.splice(index, 1);
    callback(node);
  };

  /**
  * Purges the history and empties the array.
  *
  * @method purge
  * @public
  */
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
