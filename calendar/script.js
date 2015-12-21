"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarClab = (function () {
	function CalendarClab() {
		_classCallCheck(this, CalendarClab);
	}

	_createClass(CalendarClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "calendar-clab";
			this.properties = {
				/**
         * Add a label to the calendar input
         */
				label: {
					type: String
				},
				/**
         * Whether the input is disabled or not
         */
				disabled: {
					type: Boolean,
					value: false
				},
				valueStr: {
					type: String,
					value: null,
					notify: true
				},
				inline: {
					type: Boolean,
					value: false
				},
				options: {
					type: Object,
					value: {}
				},
				placeholder: {
					type: String
				},
				type: {
					type: String,
					value: ""
				},
				noteType: {
					type: String,
					value: ''
				},
				compNoteType: {
					type: String,
					computed: '_computeNoteType(type, noteType)'
				}
			};
		}
	}, {
		key: "attached",
		value: function attached() {
			var _this = this;

			setTimeout(function () {
				_this.inline ? _this._createInstance('div.inline-cal') : _this._createInstance("input");
			}, 50);
		}
	}, {
		key: "_checkClear",
		value: function _checkClear(evt) {
			this.valueStr == "" ? this.clear() : null;
		}
	}, {
		key: "_focusElement",
		value: function _focusElement(evt) {
			if (!this.disabled) {
				evt.stopPropagation();
				this.getRomeInstance().show();
			}
		}
	}, {
		key: "_createInstance",
		value: function _createInstance(selector) {
			var obj = undefined;
			_typeof(this.options) == 'object' ? obj = this.options : obj = this.getRomeInstance().options();
			rome(this.$$(selector), obj).on('data', this._changeDate.bind(this));
		}
	}, {
		key: "_getFormat",
		value: function _getFormat() {
			var thisFormat = undefined;
			this.options.inputFormat ? thisFormat = this.options.inputFormat : thisFormat = this.getRomeInstance().options().inputFormat;
			return thisFormat;
		}
	}, {
		key: "_changeDate",
		value: function _changeDate(evt) {
			this.valueStr = evt;
			this.fire('datechange', { date: evt, dateISO: moment(evt).format() });
		}
	}, {
		key: "_computeType",
		value: function _computeType(type) {
			return ['calendar', type].join(' ');
		}
	}, {
		key: "_computeNoteType",
		value: function _computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}
	}, {
		key: "_dashify",
		value: function _dashify(label) {
			return label.toLowerCase().replace(' ', '-');
		}
	}, {
		key: "_viewLabel",
		value: function _viewLabel(label) {
			if (label.length > 0) {
				return true;
			} else {
				return false;
			}
		}

		/* PUBLIC METHODS */

	}, {
		key: "setValue",
		value: function setValue(userValue) {
			this.valueStr = moment(userValue).format(this._getFormat());
		}
	}, {
		key: "getValue",
		value: function getValue() {
			var formatted = moment(this.valueStr, this._getFormat()).format();
			return formatted;
		}
	}, {
		key: "getRomeInstance",
		value: function getRomeInstance() {
			return rome.find(this.$$('input'));
		}
	}, {
		key: "clear",
		value: function clear() {
			this.value = '';
			this.valueStr = null;
			var rome = this.getRomeInstance();
			rome.setValue(moment().format());
		}
	}]);

	return CalendarClab;
})();

Polymer(CalendarClab);