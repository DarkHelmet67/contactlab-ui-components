Polymer({
	is: 'input-clab',
	properties: {
		label: {
			type: String,
		},
		name: {
			type: String,
			value: 'textinput'
		},
		type: {
			type: String,
			value: ''
		},
		value: {
			type: String,
			value: '',
			observer: '_updateInputValue'
		},
		disabled: {
			type: Boolean,
			value: false
		}
	},
	_computeType: function(type){
		var arr = ['input-wrapper'];
		arr.push(type);
		return arr.join(' ');
	},
	_updateInputValue: function(){
		this.querySelector('input').value = this.value;
	},
	_updateCompValue: function(evt){
		this.value = this.querySelector('input').value;
		console.log(this.value);
	},
	_dashify: function(label){
		var str = label.replace(' ','-');
		return str.toLowerCase();
	}
});