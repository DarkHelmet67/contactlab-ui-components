class DropdownClab{

	beforeRegister(){
		this.is = "dropdown-clab";
		this.properties = {
			label:{
				type:String,
				value:null
			},
			type:{
				type:String,
				value:'success'
			},
			selected:{
				type:Object,
				value:{}
			},
			options:{
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'}
				]
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			resultAsObj:{
				type:Boolean,
				value:false
			},
			// How many LIs are visible without scrolling (=> sets max-height of OL)
			maxInView:{
				type:Number,
				value:4
			},
			noteType: {
				type: String
			},


			/*---------- 
			PRIVATE
			----------*/
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			},
			liHeight:{
				type:String,
				value:null,
				readonly: true
			}
		};
	}

	attached(){
		this.addEventListener('mousedown', (evt)=>{
			if(evt.target.localName=='ol' || evt.target.localName=='li') this.dontHide=true; else this.dontHide=false;
		});
		this.addEventListener('mouseup', (evt)=>{ this.dontHide=false; });
	}


	/*---------- 
	EVENT HANDLERS
	----------*/
	_toggleList(evt){
		if(!this.disabled){
			if(this.liHeight==null){
				this.querySelector('.options-list').classList.add('hidden');
				this._setMaxHeight();
				setTimeout(()=>{
					this.querySelector('.options-list').classList.remove('hidden');
					this.querySelector('.options-list').classList.add('active');
				},50);
				return;
			} 
			this.querySelector('.options-list').classList.toggle('active');
		}
	}

	_handleBlur(evt){
		if(!this.dontHide) this.querySelector('.options-list').classList.remove('active');
	}

	_setThis(evt){
		let i=evt.target.getAttribute('data-index');
		this._setValue(this.options[i]);
		this._highlightEl(i);
		this._toggleList();
	}



	/*---------- 
	FUNCTIONS
	----------*/
	_setValue(item){
		this.set('selected',item);
		this._highlightEl(this._getIndex(item, this.options));

		if(this.resultAsObj)
			this.fire('change', {'newValue':this.selected});
		else
			this.fire('change', {'newValue':this.selected.label});
		
	}

	_highlightEl(i){
		Array.from(this.querySelectorAll('.options-list li')).forEach((el)=>{
			if(el.getAttribute('data-index')==i){
				el.classList.add('selected');
			} else {
				el.classList.remove('selected');
			}
		});
	}



	/*---------- 
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.set('options', resp);
		});
	}




	/*---------- 
	COMPUTED
	----------*/
	_computeNoteType(type, noteType){
		var arr=[];
		if(type!=undefined) arr.push(type);
		if(noteType!=undefined) arr.push(noteType);
		
		if(arr.length>0) return arr.join(' ');
	}

	_compValueWrapper(disabled){
		let arr=['value_wrapper'];
		if(disabled) arr.push('disabled');
		return arr.join(' ');
	}



	/*---------- 
	UTILS
	----------*/
	_getIndex(item, items){
		return items.indexOf(item);
	}

	_viewValue(val){
		if(val.hasOwnProperty('label')) return true; else return false;
	}

	_viewLabel(label) {
		if(label.length>0) return true; else return false;
	}

	_setMaxHeight(){
		this.liHeight=this.querySelectorAll('.options-list li')[0].clientHeight;
		this.querySelector('.options-list').style.maxHeight=(this.liHeight*this.maxInView)+'px';
	}




	/*---------- 
	PUBLIC
	----------*/
	getSelectedLabel(){
		return this.selected.label;
	}

	getSelectedValue(){
		return this.selected.value;
	}

	setByLabel(str){
		this.options.forEach(opt=>{
			if(opt.label===str){
				this._setValue(opt);
			}
		});
	} 

	setByValue(str){
		this.options.forEach(opt=>{
			if(opt.value===str){
				this._setValue(opt);
			}
		});
	} 

}



Polymer(DropdownClab);