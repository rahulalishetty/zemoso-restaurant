var tables = {
	"tables":[	
				{
					id: 1,
					name: "Table-1",
					totalPrice: 0,
					totalItems: 0,
					items:[]
				},
				{
					id: 2,
					name: "Table-2",
					totalPrice: 0,
					totalItems: 0,
					items:[]
				},
				{
					id: 3,
					name: "Table-3",
					totalPrice: 0,
					totalItems: 0,
					items:[]
				}
			]	
};

var menu = {
	"entree":[	
				{
					id: 1,
					name: "Spicy Honey-Brushed Chicken Thighs (entree)",
					price: 125
				},
				{
					id: 2,
					name: "Easy Baked Fish Fillets (entree)",
					price: 200
				}
			],
	"main-course":[	
				{
					id: 3,
					name: "Spaghetti with Sausage and Tomato Sauce (main-course)",
					price: 300
				}
			],
	"desserts":[	
				{
					id: 4,
					name: "bluberry Sunday creme (desserts)",
					price: 250
				}
			],
	"appetizers":[	
				{
					id: 5,
					name: "Spaghetti with Sausage (appetizers)",
					price: 170
				}
			],
	"beverages":[	
				{
					id: 6,
					name: "lassi (beverages)",
					price: 150
				}
			]	
};
var menuCourseType = ["entree", "main-course", "desserts", "appetizers", "beverages"];

addTablesToDom();
function addTablesToDom(){
	var allTables="";
	var tableList=document.getElementById("table-list");
	removeChildren(tableList);
	var tableListElements=document.createElement("div");
	tables.tables.forEach(function (table){
		allTables += '<div class="table-list-element" ondrop="drop(event)" id="'+
			table.id+'" onclick="openTableForm('+table.id+
			')" ondragover="allowDrop(event)">'+table.name+
			'</br><span class="table-contents">Rs.'+table.totalPrice+
			'&nbsp&nbsp|&nbspTotal-Items:'+table.totalItems+'</span></div>';
		});
	tableListElements.innerHTML = allTables;
	console.log(tableListElements);
	tableList.appendChild(tableListElements);
}

addAllMenuItemsToDom();
function addAllMenuItemsToDom(){
	var allItems="";
	var menuList=document.getElementById("menu-list");
	var menuListElements=document.createElement("div");
	menuCourseType.forEach(function(courseType){
		menu[courseType].forEach(function (item){
		allItems += '<div class="menu-list-element" ondragstart="drag(event)" id="'+item.id
					+'"><div class="item-name" ><p>'+
					item.name+'</p></div><div class="item-contents"><p class="price">'+
					item.price+'</p></div></div>';
		});
	});
	menuListElements.innerHTML = allItems;
	console.log(menuListElements);
	menuList.appendChild(menuListElements);

	var menuListElements=document.getElementsByClassName("menu-list-element");
	for(var index=0; index < menuListElements.length; index++){
		menuListElements[index].setAttribute('draggable', true);
	}
}


function removeChildren(parent){
	while(parent.firstChild){
		parent.removeChild(parent.firstChild);
	}
}

function searchMenu(){
	var menuList=document.getElementById("menu-list");
	removeChildren(menuList);
	var input = document.getElementById("search-menu");
	var filter = input.value.toLowerCase();
	if(filter == ""){
		addAllMenuItemsToDom();
	}
	else if(menuCourseType.indexOf(filter) > -1){
		addCourseTypeItemsToDom(filter);
	}else{
		 getItemsByFilter(filter);
	}
}

function searchTable(){
	var tableList=document.getElementById("table-list");
	removeChildren(tableList);
	var input = document.getElementById("search-table");
	var filter = input.value.toLowerCase();
	if(filter == "")
		addTablesToDom();
	else
		getTablesByFilter(filter);
}

function addCourseTypeItemsToDom(courseType){
	var allItems="";
	var menuList=document.getElementById("menu-list");
	var menuListElements=document.createElement("div")
	menu[courseType].forEach(function (item){
		allItems += '<div class="menu-list-element" ondragstart="drag(event)" id="'+item.id
					+'"><div class="item-name" ><p>'+
					item.name+'</p></div><div class="item-contents"><p class="price">'+
					item.price+'</p></div></div>';
	});
	menuListElements.innerHTML = allItems;
	console.log(menuListElements);
	menuList.appendChild(menuListElements);

	var menuListElements=document.getElementsByClassName("menu-list-element");
	for(var index=0; index < menuListElements.length; index++){
		menuListElements[index].setAttribute('draggable', true);
	}
}

function getItemsByFilter(filter){
	var allItems="";
	var menuList=document.getElementById("menu-list");
	var menuListElements=document.createElement("div");
	menuCourseType.forEach(function(courseType){
		menu[courseType].forEach(function (item){
			if (item.name.toLowerCase().indexOf(filter) > -1) {
				allItems += '<div class="menu-list-element" ondragstart="drag(event)" id="'+item.id
					+'"><div class="item-name" ><p>'+
					item.name+'</p></div><div class="item-contents"><p class="price">'+
					item.price+'</p></div></div>';
			}
		});
	});

	menuListElements.innerHTML = allItems;
	console.log(menuListElements);
	menuList.appendChild(menuListElements);

	var menuListElements=document.getElementsByClassName("menu-list-element");
	for(var index=0; index < menuListElements.length; index++){
		menuListElements[index].setAttribute('draggable', true);
	}
}

function getTablesByFilter(filter){
	var allTables="";
	var tableList=document.getElementById("table-list");
	var tableListElements=document.createElement("div")
	tables.tables.forEach(function (table){
		if (table.name.toLowerCase().indexOf(filter) > -1) {
			allTables += '<div class="table-list-element" ondrop="drop(event)" ondragover="allowDrop(event)">'+
			table.name+
			'</br><span class="table-contents">Rs.'+table.totalPrice+
			'&nbsp&nbsp|&nbspTotal-Items:'+table.totalItems+'</span></div>';
		}
	});

	tableListElements.innerHTML = allTables;
	console.log(tableListElements);
	tableList.appendChild(tableListElements);
}

function drag(event){
	event.dataTransfer.setData("id", event.target.id);
	console.log("drag has started", event.target.id);
}

function drop(event){
	event.preventDefault();
	console.log('in drop');
	var ItemId=event.dataTransfer.getData("id");
	var tableId= event.target.id;
	var orderedItem;
	menuCourseType.forEach(function(courseType){
		menu[courseType].forEach(function (item){
			if (item.id == ItemId) {
				orderedItem = item;
			}
		});
	});
	console.log(orderedItem);
	tables.tables.forEach(function (table){
		if (table.id==tableId) {
			var itemAlreadyPresent= false;
			table.items.forEach(function (item){
				if(item.itemId == orderedItem.id){
					item.numberOfServings+=1;
					itemAlreadyPresent=true;
					table.totalPrice+=orderedItem.price;
					table.totalItems+=1;
				}
				console.log("updated:",item);
			});

			if(itemAlreadyPresent == false){
				var newItemToTable={
					numberOfServings: 1,
					itemName: orderedItem.name,
					itemPrice: orderedItem.price,
					itemId: orderedItem.id
				}

				table.items.push(newItemToTable);
				table.totalPrice+= newItemToTable.itemPrice;
				table.totalItems+=1;
			}
			console.log(table.items);
			addTablesToDom();
		}
	});
}

function allowDrop(event){
	event.preventDefault();
}

function openTableForm(tableId){
	console.log(tableId);
	document.getElementById("tableForm").style.display = "block";
	var header = document.getElementById("header-details");
	var orderTableElements="";
	var orderTable= document.getElementById("order-table");
	var earlierChild=document.getElementById("tbody");
	var closeSessionElement= document.getElementById("close-session");
	var closeSessionChild = document.createElement('div');
	var closeSessionMessage="";
	if(earlierChild!=null)
		removeTbody(earlierChild);
	var orderTableChildren=document.createElement("tbody");
	orderTableChildren.setAttribute("id", "tbody");
    var sno=1;
    var total=0;
	tables.tables.forEach(function(table){
		if(table.id === tableId){
			console.log(table.id);
			header.innerHTML=table.name+" | Order Details";
			table.items.forEach(function(item){
				orderTableElements+='<tr class="table-row">'+
                    		'<td class="sno">'+sno+'</td>'+
                    		'<td class="item">'+item.itemName+'</td>'+
                    		'<td class="price">'+item.itemPrice+
                    		'<td class="numberOfServings"><input type="number"'+
                    		'onchange="updateServings('+item.itemId+','+table.id+')" value="'+
                    		item.numberOfServings+'" id="item'+item.itemId+'"/></td>'+
                    		'<td class="delete" ><img src="./pics/delete.png"'+
                    		'onclick="deleteItem('+item.itemId+','+table.id+')" /></td>'+
                    	'</tr>';
                sno++;
                total+=item.numberOfServings * item.itemPrice;
			});
			closeSessionMessage+='<p onclick="closeTable('+table.id+')" >CLOSE SESSION(GENERATE BILL)</p>';
		}
	});

	closeSessionChild.innerHTML = closeSessionMessage;
	closeSessionElement.appendChild(closeSessionChild);

	orderTableElements+='<tr class="table-row">'+
                    		'<td class="sno"></td>'+
                    		'<td class="item"></td>'+
                    		'<td class="price">Total:<br/>'+total+
                    		'<td class="numberOfServings"></td>'+
                    		'<td ></td>'+
                    	'</tr>';
	orderTableChildren.innerHTML=orderTableElements;
	console.log(orderTableChildren);
	orderTable.appendChild(orderTableChildren);
}

function deleteItem(itemId, tableId){
	index=-1;
	tables.tables.forEach(function(table){
		if(table.id == tableId){
			table.items.forEach(function(item){
				index++;
				if(item.itemId == itemId){
					table.totalPrice -= item.itemPrice * item.numberOfServings;
					table.totalItems -= item.numberOfServings;
					table.items.splice(index,1);
				}
			});
		}
	});
	openTableForm(tableId);
	addTablesToDom();
}

function updateServings(itemId, tableId){
	console.log(itemId);
	var input=document.getElementById('item'+itemId);
	console.log(input.value);
	tables.tables.forEach(function(table){
		table.items.forEach(function(item){
			if(item.itemId == itemId){
				if(Number(input.value)<0){
					table.totalItems -= item.numberOfServings;
					table.totalPrice -= item.numberOfServings * item.itemPrice;
					item.numberOfServings = 0;
				}
				else{
					table.totalItems -= item.numberOfServings;
					table.totalPrice -= item.numberOfServings * item.itemPrice;
					item.numberOfServings = Number(input.value);
					table.totalItems += item.numberOfServings;
					table.totalPrice += item.numberOfServings * item.itemPrice;
				}
			}
		});
	});
	openTableForm(tableId);
	addTablesToDom();
}

function closeTable(tableId){
	tables.tables.forEach(function(table){
		if(table.id == tableId){
			table.items=[];
			table.totalItems=0;
			table.totalPrice=0;
		}
	});
	document.getElementById("tableForm").style.display = "none";
	addTablesToDom();
}

function removeTbody(tBody){
	tBody.remove();
}

var tablePopUp = document.getElementById("tableForm");
var closeButton = document.getElementsByClassName('close')[0];

closeButton.onclick=function() {
	document.getElementById("tableForm").style.display = "none";
}

window.onclick = function(event) {
	if(event.target == tablePopUp)
		document.getElementById("tableForm").style.display = "none";
}