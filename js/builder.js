'use strict';

(function(ComboDepot) {

  /**
  * The Builder class controls a combo builder.
  *
  * @class Builder
  * @constructor
  * @param {Object} opts Options to configure the combo builder
  */
  var Builder = function(opts) {
    opts = opts || {};

    var baseSelector = opts.base || '#combo-builder';

    this._base = document.querySelector(baseSelector);

    if (this._base == null || typeof this._base === 'undefined') {
      throw 'Could not find element for base: ' + baseSelector;
    }

    this._builder  = this._base.querySelector('.builder');
    this._preview  = this._base.querySelector('.preview');
    this._undo     = this._base.querySelector('.undo');
    this._print    = this._base.querySelector('.print');
    this._commands = this._base.querySelector('.commands');
    this._load     = this._base.querySelector('.load');

    var removeCommand = function(node) {
      this._preview.removeChild(node);
    }.bind(this);

    this._history = new ComboDepot.History({
      onPush: this._addCommand.bind(this),
      onPop: removeCommand,
      onRemove: removeCommand
    });

    this._renderBuilder();
    this._bindEvents();
  };

  /**
  * Renders a div used to separate command sets from different games.
  *
  * @method _renderCommandSet
  * @param {String} title The title for the command set section.
  * @return {Node} The div element.
  * @private
  */
  Builder.prototype._renderCommandSet = function(title) {
    var setEl = document.createElement('div');

    setEl.innerHTML = title;
    setEl.className = 'command-set';

    return setEl;
  };

  /**
  * Renders a command icon;
  *
  * @method _renderCommand
  * @param {String} command The name of the command (from buttons.js).
  * @return {Node} The span element.
  * @private
  */
  Builder.prototype._renderCommand = function(command) {
    var commandEl = document.createElement('span');

    commandEl.className = 'command ' + command;
    commandEl.dataset.command = command;

    return commandEl;
  };

  /**
  * Renders the builder section, including all the command icons.
  *
  * @method _renderBuilder
  * @private
  */
  Builder.prototype._renderBuilder = function() {
    var commands = document.createDocumentFragment();
    var command;
    var currentSet;
    var set;

    for (command in ComboDepot.CLASSES) {
      set = ComboDepot.CLASSES[command];

      if (currentSet != set) {
        currentSet = set;
        commands.appendChild(this._renderCommandSet(set));
      }

      commands.appendChild(this._renderCommand(command));
    }

    this._commandBlock = this._builder.appendChild(commands);
  };

  /**
  * Binds the neccessary DOM events.
  *
  * @method _bindEvents
  * @private
  */
  Builder.prototype._bindEvents = function() {
    this._builder.addEventListener('click', function(e) {
			if (typeof e.target.dataset.command !== 'undefined') {
				this._history.push(e.target.cloneNode());
			}
    }.bind(this));

    this._preview.addEventListener('click', this._previewCommandClick.bind(this));

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

  Builder.prototype._addCommand = function(node) {
    var isPlus = node.dataset.command.indexOf('separators') === 0;
    var children;

    if (isPlus) {
      children = Array.prototype.slice.call(this._preview.children);
      this._preview.removeChild(children.pop());
    }

    this._preview.appendChild(node);

    if (!isPlus) {
      this._preview.appendChild(this._renderCommand('separators-comma'));
    }
  };

  /**
  * Removes a command when it has been clicked in the preview frame.
  *
  * @method _previewCommandClick
  * @param {Event} e The click event.
  * @private
  */
  Builder.prototype._previewCommandClick = function(e) {
    if (typeof e.target.dataset.command === 'undefined') {
      return;
    }

    this._history.remove(e.target);
  };

  /**
  * Destroys the builder.
  *
  * @method destroy
  * @public
  */
  Builder.prototype.destroy = function() {
    this._preview.innerHTML = '';
  };

	ComboDepot.Builder = Builder;

}).call(this, this.ComboDepot);
