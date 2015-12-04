class NoteClab{

	beforeRegister(){
		this.is = "note-clab";
		this.properties = {
			type: {
				type: String,
				value: ''
			},

			classes: {
				type: String,
				computed: 'computeClasses(type)'
			}
		}
	}

	computeClasses(type){
		return ['input-note', type].join(' ');
	}
}


Polymer(NoteClab);