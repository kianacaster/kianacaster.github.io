// Useful functions for JavaScript by Kian Acaster \\
// (Yes, I do know that some of these functions are in JavaScript already, but I felt like redoing it) \\
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Current functions:
// - Sorting an array (using Bubblesort)
// - Sorting an array (using Quicksort) --> Credit to @jasondscott on GitHub
// - Reversing an array (flip the array)
// - Selective removal from an array (remove all types of something from an array, e.g. all numbers, all strings etc.)
// - Clearing an array (delete all values from an array)
// - Replacing elements in an array (change a value in an array)
// - Removing elements from an array (delete an element from an array)
// - Swapping elements in an array (swap the position of two elements in an array)
// - Predefining an array (make an array with a specific number of elements to it)
// - Random function (generate a random number)
// - Floor function (round numbers down)
// - Ceiling function (round numbers up) 
// - Rounding function (rounds decimals to integers using proper rounding logic)
// - Invert function (make a negative number positive, and a positive number negative)
// - Convert to string (turns a value into a string)
// - Convert to number (turns a value into a number)
// - Convert a number to hex (turn a base 10 number to base 16)
// - Convert a number from hex (turn a base 16 number into base 10)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 	
* A simple sorting function.
* It iterates through the array,
* then, checks at each index if
* it is larger than the number at
* the index in front of it.
* If it is larger, they swap places,
* else, they stay the same.
* This then means that by the
* end of the process, the array is sorted.
*/
Array.prototype.bubblesort = function() {
	for(var i = 0; i < this.length; i++){ // Loop over the array forwards (to execute the swap process the required amount of times)
		for(var j = 0; j < this.length - 1; j++){ // Loops over the array forwards again
			if(this[j] > this[j + 1]){ // If the current index value is larger than the one in front...
				this.swap(j, j+1); // Swap the values at index j and index j + 1
			}
		}
	}
	return this; // Return the array after each element has been swapped accordingly
};
/*
* Another sorting function.
* This is using a quicksort algorithm
* which performs much faster than the
* bubblesort algorithm - but therefore,
* it's much more complicated.
* I didn't write this one, all credit goes to
* @jasondscott on GitHub 
* (https://gist.github.com/jasondscott/7073857)
* I just though it'd be useful to have a
* better algorithm for sorting.
* (There's no commenting on this because I don't particularly understand it).
*/
Array.prototype.quickSort = function() {
	var r = this;
	if(this.length <= 1) {
		return this;
	}
	var less = [], greater = [];
	var pivot = r.splice(Math.floor(r.length / 2),1);
	for (var i = r.length - 1 ; i >= 0; i--){
		if (r[i] <= pivot){
			less.push(r[i]);
		}else{
			greater.push(r[i]);
		}
	  }
	var c = [];
	return c.concat(less.quickSort(), pivot, greater.quickSort());
};
/*
* A function to reverse the array.
* The function iterates over the array
* backwards, and pushes each item into 
* a temporary array. The temporary array
* will have all the elements from the main 
* array, but in reverse order (because it
* was iterated over backwards).
* As the array is being iterated over,
* for each item we push to the temporary array,
* we splice from the main array.
* This results in the main array being empty
* and the temporary array being the main array
* but in reverse order. Then all we do is
* join the arrays together, and return.
*/
Array.prototype.reverseArray = function(){
	var temp = []; // Temporary array
	for(var i = this.length - 1; i >= 0; i--){ // Loop over the main array backwards
		temp.push(this[i]); // Push each element from the main array to the temporary array in reverse order
		this.cut(i); // Get rid of each element added to the temporary array from the main array
	}
	return this.concat(temp); // Join the arrays and return
}
/*
* A function to remove specific variable types from an array.
* It loops through the array checks if the element
* at the current index is a type of the element
* the user specified.
* If it is, remove it. 
*/
Array.prototype.removeType = function(type){
	for(var i = 0; i < this.length; i++){ // Loops over to make sure everything is checked.
		for(var j = 0; j < this.length; j++){ // Loops over each elements in the array.
			if(typeof this[j] == type){ // If the current element is a type of variable that the user specified...
				this.cut(j); // Delete it
			}
		}
	}
	return this; // Return the array.
}
/*
* An alternative function to clear an array.
* It splices each element from index 0 to the last index,
* resulting in an empty array.
*/
Array.prototype.wipe = function(){
	this.splice(0, this.length); // Splice each element
	return this; // Return the array
}
/*
* A function to replace a value
* at an index in an array.
* The user enters a value and an index.
* The value represents what the element in the array will be,
* the index represents which part of the array will be replaced.
* (e.g If you have an array -> [0,1,2,3] and call replace("k", 0), the result will be -> ["k",1,2,3])
*/
Array.prototype.replace = function(value, index){
	this[index] = value;
	return this;
}
/*
* A function to remove a value from an array.
* The user specifies an index to cut from the array,
* it loops through the main array and appends each value 
* to a temporary array if the current index is not the same
* as the one the user says. This results in the index that the user
* wrote to be skipped over, and the temporary array has every element in it but
* the one at the index they mentioned.
* Then the main array has each value from the temporary array appended to it,
* and the main array is returned.
*/
Array.prototype.cut = function(index){
	var temp = []; // Temporary array
	for(var i = 0; i < this.length; i++){ // Loop through the main array...
		if(i !== index){ // If the current index is not equal to the one the user wrote...
			temp.push(this[i]); // Push the value at the current index to the temporary array.
		}
	}
	this.wipe(); // Clear the main array
	for(var i = 0; i < temp.length; i++){ // Loop through the temporary array
		this[i] = temp[i]; // Each value in the main array is the same as it is in the temporary array
	}
	return this; // Return the array.
}
/*
* A function to swap values in the array.
* The user specifies two indexes to swap the values of,
* then, the value at index2 becomes the value at index1,
* and the value at index1 becomes the value at index2.
*/
Array.prototype.swap = function(index1, index2){
	var temp = this[index2]; // Temporary variable to store the value at index2
	this[index2] = this[index1]; // The value at index2 becomes the one at index1
	this[index1] = temp; // Since the value at index2 has been overridden, the value at index1 becomes the value we stored in the temporary variable.
	return this; // Return the array.
}
/*
* A function to predefine an array.
* The user calls the function and passes it a length and value parameter.
* The length represents how many indexes the array will have,
* and the value represents what each index will be set to.
* (e.g. if length is 10 and values is 0, the result will be [0,0,0,0,0,0,0,0,0,0])
*/
Array.prototype.predefine = function(length, values){
	for(var i = 0; i < length; i++){ // A loop that goes from 0 to length
		this.push(values); // Push the value specified by the user to the main array
	}
	return this; // Return the array.
}
/*
* A function to generate a random number.
* The user enters a minimum value
* and a maximum value. 
* If neither are specified, it generates
* a random number between 0 and 1.
* Else, it generates a random number between the
* minimum and maximum value.
* If only one parameter is entered, it will treat
* that as the maximum value - and therefore the
* minimum value will be 0
*/
function random(param1, param2){
	var min, max; // Define minimum value and maximum value
	if(param2 == undefined && param1 == undefined){ // If there are no parameters
		return Math.random(); // Return random number between 0 and 1
	}else if(param2 == undefined && typeof param1 == "number"){ // If there is only one parameter
		return Math.random() * param1; // Return a random number between 0 and the parameter value
	}else{
		min = param1; // Minimum value is the first parameter
		max = param2; // Maximum value is the second parameter
		return Math.random() * (max - min) + min; // Return a random value between min and max
	}
}
/*
* A floor function.
* This rounds down every number, no matter what.
* (e.g. 4.5 -> 4 : 4.7 -> 4 : 4.1 -> 4 : 4.9 -> 4)
*/
function floor(value){
	if(typeof value == "number"){
		if(value % 1 == 0){ // If the value is a whole number already...
			return value; // Return it.
		}else{
			var numstring = value.toString(); // Turn the value to a string
			var stringArray = []; // Make an array
			var newstring = ""; // Define an empty string
			for(var i = 0; i < numstring.length; i++){ // Iterate over the string of the value
				stringArray.push(numstring.charAt(i)); // Push each character from the string to the array
			}
			for(var i = 0; i < stringArray.length; i++){ // Iterate over the array
				if(stringArray[i] !== "."){ // If the current index is not a decimal point
					newstring += stringArray[i]; // Add the value in the array to the string
				}else{ // If we have encountered the decimal point
					return parseInt(newstring); // Return an integer value of the string that was generated
				}
			}
		}
	}else{
		return NaN;
	}
}
/*
* A ceiling function.
* This rounds numbers up, no matter what.
* (e.g. 4.5 -> 5 : 4.7 -> 5 : 4.1 -> 5 : 4.9 -> 5)
* Here, the floor function is used to do most of the work.
* Just add one to the number and floor it, then that's
* the same value as rounding it up.
*/
function ceil(value){
	return floor(value + 1); // Return the floor of the value + 1
}
/*
* A function to round a number.
* This uses practically all of the code that the
* floor function uses. 
* It checks if value after the decimal point
* is larger than or equal to 5 - if it is,
* it performs the ceiling function on the value (to round it up).
* Else, it must be less than 5, so it performs the floor function.
*/
function round(value){
	if(typeof value == "number"){
		if(value % 1 == 0){ // If the value is a whole number already...
			return value; // Return it.
		}else{
			var numstring = value.toString(); // Turn the value to a string
			var stringArray = []; // Make an array
			for(var i = 0; i < numstring.length; i++){ // Iterate over the string of the value
				stringArray.push(numstring.charAt(i)); // Push each character from the string to the array
			}
			for(var i = 0; i < stringArray.length; i++){ // Iterate over the array
				if(stringArray[i] == "."){ // If the current index is a decimal point
					if(numstring.charAt(i+1) >= 5){ // Is the number after the decimal point larger than or equal to five...
						return ceil(value); // Return the rounded up number
					}else{ // If it's less than five
						return floor(value); // Return the rounded down number
					}
				}
			}
		}
	}	
}
/*
* A function to invert a number.
* If the number is positive,
* it becomes negative and if
* it is negative, it becomes
* positive.
*/
function invert(value){
	return value*-1; // Return the value multiplied by minus one - this will make a positive number negative and a negative number positive.
}
/*
* A function to convert a value to a string.
* This is pretty much just a way to shorten
* the process. It uses the inbuilt JavaScript
* function to convert it.
*/
function str(value, base){
	if(base !== undefined && typeof base == "number"){
		return value.toString(base); // Return the string value of the number
	}else if(base == undefined){
		return value.toString();
	}else{
		return undefined;
	}	
}
/*
* A function to convert a value (like a string) to an number.
* Again, it just uses JavaScript's
* inbuilt parseFloat function.
* It's just a function to shorten
* the process for the user. 
*/
function number(value, base){
	return parseFloat(value, base);	
}
/*
* A function to convert a decimal value to hex.
* It uses the str function and the base parameter
* to do this easily.
*/
function toHex(value){
	return str(value, 16).toUpperCase(); // Return the uppercase value of the string value of the parameter "value" in base 16.
}
/*
* A function to convert a hex value to decimal.
*/
function fromHex(value){
	return parseInt(toHex(value), 16); // Return the number value of the string value of the parameter "value" in base 10.
}