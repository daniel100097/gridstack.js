"use strict";
/**
 * gridstack.js 1.0.0-dev
 * http://troolee.github.io/gridstack.js/
 * (c) 2014-2017 Pavel Reznikov, Dylan Weiss
 * gridstack.js may be freely distributed under the MIT license.
 * @preserve
 */


import * as jQuery from 'jquery';
import * as _ from 'lodash'

global.jQuery = jQuery;

import './jquery-ui'

const $ = jQuery;

import GridStackUI from './gridstack'

var scope = window;

/**
 * @class JQueryUIGridStackDragDropPlugin
 * jQuery UI implementation of drag'n'drop gridstack plugin.
 */
function JQueryUIGridStackDragDropPlugin(grid) {
  GridStackUI.GridStackDragDropPlugin.call(this, grid);
}

GridStackUI.GridStackDragDropPlugin.registerPlugin(JQueryUIGridStackDragDropPlugin);

JQueryUIGridStackDragDropPlugin.prototype = Object.create(GridStackUI.GridStackDragDropPlugin.prototype);
JQueryUIGridStackDragDropPlugin.prototype.constructor = JQueryUIGridStackDragDropPlugin;

JQueryUIGridStackDragDropPlugin.prototype.resizable = function (el, opts) {
  el = $(el);
  if (opts === 'disable' || opts === 'enable') {
    el.resizable(opts);
  } else if (opts === 'option') {
    var key = arguments[2];
    var value = arguments[3];
    el.resizable(opts, key, value);
  } else {
    var handles = el.data('gs-resize-handles') ? el.data('gs-resize-handles') :
      this.grid.opts.resizable.handles;
    el.resizable(_.extend({}, this.grid.opts.resizable, {
      handles: handles
    }, {
      start: opts.start || function () {
      },
      stop: opts.stop || function () {
      },
      resize: opts.resize || function () {
      }
    }));
  }
  return this;
};

JQueryUIGridStackDragDropPlugin.prototype.draggable = function (el, opts) {
  el = $(el);
  if (opts === 'disable' || opts === 'enable') {
    el.draggable(opts);
  } else {
    el.draggable(_.extend({}, this.grid.opts.draggable, {
      containment: this.grid.opts.isNested ? this.grid.container.parent() : null,
      start: opts.start || function () {
      },
      stop: opts.stop || function () {
      },
      drag: opts.drag || function () {
      }
    }));
  }
  return this;
};

JQueryUIGridStackDragDropPlugin.prototype.droppable = function (el, opts) {
  el = $(el);
  el.droppable(opts);
  return this;
};

JQueryUIGridStackDragDropPlugin.prototype.isDroppable = function (el, opts) {
  el = $(el);
  return Boolean(el.data('droppable'));
};

JQueryUIGridStackDragDropPlugin.prototype.on = function (el, eventName, callback) {
  $(el).on(eventName, callback);
  return this;
};

export default JQueryUIGridStackDragDropPlugin;

