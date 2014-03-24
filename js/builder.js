'use strict';

(function(ComboDepot) {

  var Builder = function(opts) {
    opts = opts || {};

    var builderSelector = opts.builder || '#builder';
    var previewSelector = opts.preview || '#preview';

    this._builder = document.querySelector(builderSelector);
    this._preview = document.querySelector(previewSelector);
    this._undo = document.querySelector('#undo');
    this._print = document.querySelector('#print');
    this._commands = document.querySelector('#commands');
    this._load = document.querySelector('#load');

    this._history = new ComboDepot.History(this._preview);

    this._renderBuilder();
    this._bindEvents();
  };

  Builder.prototype._renderCommand = function(command) {
    var commandEl = document.createElement('span');

    commandEl.className = 'command ' + command;
    commandEl.dataset.command = command;

    return commandEl;
  };

  Builder.prototype._renderBuilder = function() {
    var commands = document.createDocumentFragment();
    var command;

    for (command in ComboDepot.CLASSES) {
      commands.appendChild(this._renderCommand(command));
    }

    this._commandBlock = this._builder.appendChild(commands);
  };

  Builder.prototype._bindEvents = function() {
    this._builder.addEventListener('click', function(e) {
			if (e.target.className.indexOf('command') !== -1) {
				this._history.push(e.target.cloneNode());
			}
    }.bind(this));

    this._undo.addEventListener('click', function(e) {
      this._history.pop();
    }.bind(this));

    this._print.addEventListener('click', function(e) {
      console.log(this._history.toJSON(function(n) {
        return n.dataset.command;
      }));
    }.bind(this));

    this._load.addEventListener('click', function(e) {
      this._history.purge();
      this.destroy();
      this._history.load(this._commands.value, Builder.prototype._renderCommand);
    }.bind(this));
  };

  Builder.prototype.destroy = function() {
    this._preview.innerHTML = '';
  };

	ComboDepot.Builder = Builder;

}).call(this, this.ComboDepot);
