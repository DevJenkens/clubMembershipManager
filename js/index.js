// JavaScript Document

//With Local Storage

window.onload = function() {
	"use strict";

	var tableContents;
	var table = document.getElementById("myTable");

	var localData = JSON.parse(localStorage.getItem("tableContents"));

	if (localData !== null) {
		tableContents = localData;
		addTable();
	} else {
		tableContents = [];
	}

	//PLACEHOLDER************************************************
	document.getElementById("firstname").value = makeid();
	document.getElementById("lastname").value = makeid();
	document.getElementById("amountpaid").value = Math.floor(Math.random() * 20);

	function makeid(){
    	var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    	for( var i=0; i < 5; i++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	//***********************************************************

	//Add to array Function*************
	document.getElementById("addToArray").onclick = addArray;

	function addArray() {
		//Put values in object
		var userDetails = {};
		userDetails.userFirstName = document.getElementById("firstname").value;
		userDetails.userLastName = document.getElementById("lastname").value;
		userDetails.userPaid = document.getElementById("amountpaid").value;


		//Put data into array
		tableContents.push(userDetails);

		//Placeholder**************

		document.getElementById("firstname").value = makeid();
		document.getElementById("lastname").value = makeid();
		document.getElementById("amountpaid").value = Math.floor(Math.random() * 20);

		//Local Storage
		storeData();
	}

	//Add to table Function*************
	document.getElementById("addToTable").onclick = addTable;

	function addTable() {

		//Local Storage
		storeData();

		//Delete old data
		while(table.rows.length > 1) {
			table.deleteRow(1);
		}


		//Create Table contents
		for(var i = 0; i < tableContents.length; i++) {
			//Create Row
			var row = table.insertRow(-1);

			//Create Cells
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);

			//Put Data in Cells
			cell1.innerHTML = (tableContents[i].userFirstName);
			cell2.innerHTML = (tableContents[i].userLastName);
			cell3.innerHTML = (tableContents[i].userPaid);

			//Remove data from array, then reconstruct the array when the buttons clicked

			//Add the delete buttons
			var deleteButton = document.createElement("button");
			deleteButton.innerHTML = "Delete Row";
			deleteButton.className = ("deleteButton");
			cell4.appendChild(deleteButton);


		}

		var deleteButtons = document.getElementsByClassName("deleteButton");
		for (i = 0; i < deleteButtons.length; i++) {

			var  currentButton = deleteButtons[i];
			currentButton.id = (i);
			currentButton.onclick = deleteRow;

		}

	}


	//Delete row from string and regenerate table
	function deleteRow() {

		/* jshint validthis: true */
		var rowIndex = this.id;
		tableContents.splice(rowIndex, 1);

		addTable();
	}

	//Delete table contents
	document.getElementById("deleteTable").onclick = deleteTable;

	function deleteTable() {
		tableContents.splice(0, tableContents.length);

		addTable();
	}


	//Sort by FirstName Function*************
	document.getElementById("sortByFirstName").onclick = sortFirstName;

	function sortFirstName() {

		tableContents.sort(sortFirstNameFunction);

		function sortFirstNameFunction(a, b){
   			var A = a.userFirstName.toLowerCase();
			var B = b.userFirstName.toLowerCase();
   				if (A < B) {
       				return -1;
				}
   				if (A > B) {
       				return 1;
				}
   				return 0;
		}

		addTable();

	}

	//Sort by LastName Function************
	document.getElementById("sortByLastName").onclick = sortLastName;

	function sortLastName() {

		tableContents.sort(sortLastNameFunction);

		function sortLastNameFunction(a, b){
   			var A = a.userLastName.toLowerCase();
			var B = b.userLastName.toLowerCase();
   				if (A < B) {
       				return -1;
				}
   				if (A > B) {
       				return 1;
				}
   				return 0;
		}

		addTable();

	}

	//Sort by Paid Function************
	document.getElementById("sortByPaid").onclick = sortPaid;

	function sortPaid() {

		tableContents.sort(sortPaidFunction);

		function sortPaidFunction(a, b){
			return a.userPaid-b.userPaid;
		}

		addTable();
	}

	//Store data locally

	function storeData() {
		localStorage.setItem("tableContents", JSON.stringify(tableContents));

	}
};
