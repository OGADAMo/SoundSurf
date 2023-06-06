class Validator {
	constructor(config, formID) {
	  this.elementsConfig = config;
	  this.formID = formID;
	  this.errors = {};
  
	  this.generateErrorsObject();
	  this.inputListener();
	}
  
	// Generate an empty errors object with fields as keys
	generateErrorsObject() {
	  for (let field in this.elementsConfig) {
		this.errors[field] = [];
	  }
	}
  
	// Add input event listeners to the form fields
	inputListener() {
	  let inputSelector = this.elementsConfig;
  
	  for (let field in inputSelector) {
		let el = document.querySelector(`${this.formID} input[name="${field}"]`);
  
		el.addEventListener('input', this.validate.bind(this));
	  }
	}
  
	// Validate the form field on input
	validate(e) {
	  let elFields = this.elementsConfig;
  
	  let field = e.target;
	  let fieldName = field.getAttribute('name');
	  let fieldValue = field.value;
  
	  this.errors[fieldName] = [];
  
	  if (elFields[fieldName].required) {
		if (fieldValue === '') {
		  this.errors[fieldName].push('Field is empty');
		}
	  }
  
	  if (elFields[fieldName].email) {
		if (!this.validateEmail(fieldValue)) {
		  this.errors[fieldName].push('Invalid email address');
		}
	  }
  
	  if (fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) {
		this.errors[fieldName].push(`Field must have a minimum of ${elFields[fieldName].minlength} and a maximum of ${elFields[fieldName].maxlength} characters`);
	  }
  
	  if (elFields[fieldName].matching) {
		let matchingEl = document.querySelector(`${this.formID} input[name="${elFields[fieldName].matching}"]`);
  
		if (fieldValue !== matchingEl.value) {
		  this.errors[fieldName].push('Passwords do not match');
		}
  
		if (this.errors[fieldName].length === 0) {
		  this.errors[fieldName] = [];
		  this.errors[elFields[fieldName].matching] = [];
		}
	  }
  
	  this.populateErrors(this.errors);
	}
  
	// Check if all form fields passed validation
	validationPassed() {
	  for (let key of Object.keys(this.errors)) {
		if (this.errors[key].length > 0) {
		  return false;
		}
	  }
  
	  return true;
	}
  
	// Populate the error messages in the UI
	populateErrors(errors) {
	  for (const elem of document.querySelectorAll('ul')) {
		elem.remove();
	  }
  
	  for (let key of Object.keys(errors)) {
		let parentElement = document.querySelector(`${this.formID} input[name="${key}"]`).parentElement;
		let errorsElement = document.createElement('ul');
		parentElement.appendChild(errorsElement);
  
		errors[key].forEach(error => {
		  let li = document.createElement('li');
		  li.innerText = error;
  
		  errorsElement.appendChild(li);
		});
	  }
	}
  
	// Validate an email address using a regular expression
	validateEmail(email) {
	  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	  }
  
	  return false;
	}
  }
  