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
					value: false,
					observer: 'disabledChanged'
				},
				inline: {
					type: Boolean,
					value: false
				},
				options: {
					type: Object
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
					computed: 'computeNoteType(type, noteType)'
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
			this.$$('input').value == "" ? this.clear() : null;
		}
	}, {
		key: "_focusElement",
		value: function _focusElement(evt) {
			var _this2 = this;

			setTimeout(function () {
				_this2.getRomeInstance().show();
			}, 50);
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
			this.fire('datechange', { date: evt, dateISO: moment(evt).format() });
		}
	}, {
		key: "_computeType",
		value: function _computeType(type) {
			return ['calendar', type].join(' ');
		}
	}, {
		key: "computeNoteType",
		value: function computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}
	}, {
		key: "disabledChanged",
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}
	}, {
		key: "_dashify",
		value: function _dashify(label) {
			return label.toLowerCase().replace(' ', '-');
		}
	}, {
		key: "_viewLabel",
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}, {
		key: "setValue",
		value: function setValue(userValue) {
			this.$$('input').value = moment(userValue).format(this._getFormat());
		}
	}, {
		key: "getValue",
		value: function getValue() {
			var elem = this.$$('input').value;
			var formatted = moment(elem, this._getFormat()).format();
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
			this.$$('input').value = '';
			var rome = this.getRomeInstance();
			rome.setValue(moment().format());
		}
	}]);

	return CalendarClab;
})();

Polymer(CalendarClab);