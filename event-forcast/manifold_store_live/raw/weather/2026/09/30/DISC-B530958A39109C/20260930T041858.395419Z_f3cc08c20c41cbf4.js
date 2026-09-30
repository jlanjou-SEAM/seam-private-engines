isValidForm = function(val)
{
    // get required form fields from the input element
    var reqFormFieldsElement = document.getElementById("required");
    var reqFormFields = reqFormFieldsElement.value;

    // required fields split into an array based on comma
    var fields = reqFormFields.split(",");

    // if form is complete, this variable will be empty;
    // otherwise this string will contain the alert message body to display
    // to the user.
    var errMessage = "";      // the error message string
    var msgIndex = 1;         // the message index

    for (var i = 0; i < fields.length; i++) {
	// verify this field is not empty
	try {
	    var fieldVal = document.forms["madisForm"][fields[i]].value;
	    var fieldName = document.forms["madisForm"][fields[i]].name;
	    var fieldType = document.forms["madisForm"][fields[i]].type;

	    //alert("validate field '" + fields[i] + "'; " + fieldType);
	
	    if (typeof fieldVal === "undefined" || fieldType == "checkbox") {
		var tmp = radioCbValidator("madisForm", fields[i]);

		if (tmp.trim().length > 0) {
		    if (0 == errMessage.length) {
			errMessage = "The following required fields are empty: \n";
		    }

		    errMessage += msgIndex.toString() + ": " + tmp;
		    msgIndex += 1;
		}
	    } else if (fieldVal == null || fieldVal.length == 0) {
		if (0 == errMessage.length) {
		    errMessage = "The following required fields are empty: \n";
		}

		errMessage += msgIndex.toString() + ": " + fields[i] + "\n";
		msgIndex += 1;
	    }
	}
	catch (e) {
	    if (fields[i] == 'comms_type') {
	    }
	    else {
		alert("Error on field? " + fields[i] );
		errMessage += msgIndex.toString() + ": " + fields[i] + "\n";
		msgIndex += 1;
	    }
	}
    }

    if (errMessage.length > 0) {
	alert(errMessage + "\nPlease complete these fields and re-submit.");
	return false;
    }

    return true;
}

    radioCbValidator = function(formId, fieldName) {
	var message = '';
	var allFormElements = window.document.getElementById(formId).elements;
	for (var i = 0; i < allFormElements.length; i++) {
	    if (allFormElements[i].name != fieldName) {
		continue;
	    }

	    if (allFormElements[i].type == 'radio') {
		var ThisRadio = allFormElements[i].name;
		var ThisChecked = 'No';
		var AllRadioOptions = document.getElementsByName(ThisRadio);
		for (x = 0; x < AllRadioOptions.length; x++) {
		    if (AllRadioOptions[x].checked && ThisChecked == 'No') {
			ThisChecked = 'Yes';
			break;
		    } 
		}   
		var AlreadySearched = message.indexOf(ThisRadio);
		if (ThisChecked == 'No' && AlreadySearched == -1) {
		    message = message + ThisRadio + ' radio button must be answered\n';
		}     
	    } else if (allFormElements[i].type == 'checkbox') {
		var ThisCheckbox = allFormElements[i].name;
		var AllCheckboxOptions = document.getElementsByName(ThisCheckbox);
		var NotSelectedCount = 0;
		for (x = 0; x < AllCheckboxOptions.length; x++) {
		    if (!AllCheckboxOptions[x].checked) {
			NotSelectedCount += 1;
		    }
		}

		if (NotSelectedCount == AllCheckboxOptions.length) {
		    var cbName = ThisCheckbox;
		    if (ThisCheckbox == "comms_type") {
			cbName = "Distribution Method";
		    } else if (ThisCheckbox == "read_disclaimer") {
			cbName = "Disclaimer and Usage";
		    } else if (ThisCheckbox == "agree_restrictions") {
			cbName = "Data Restrictions Agreement";
		    }
		    message = message + cbName + ' checkbox option must be selected.\n';
		}
	    }

	    if (message.length > 0) {
		break;
	    }
	}

	return message;
    }
