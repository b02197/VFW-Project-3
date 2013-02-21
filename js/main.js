//Michael Eaton
//Project 2 js
//term1302

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){

//getElementById funtion to get the ids
    function $(x){
       var theElement = document.getElementById(x);
       return theElement;
    }
    
//Create select field element and populate with options
    function makeDrop(){
        var formtag = document.getElementsByTagName("form"),
            selLi = $('dropDown'),
            createSelect = document.createElement('select');
            createSelect.setAttribute("id", "temps");
        for(var i=0, j=meatTemp.length; i<j; i++){
            var createOption = document.createElement('option');
            var optText = meatTemp[i];
            createOption.setAttribute("value", optText);
            createOption.innerHTML = optText;
            createSelect.appendChild(createOption);
        }
        selLi.appendChild(createSelect);
    }
    
//Find the value of a selected radio button
   function getSelectedRadio(){
      var radio = document.forms[0].side;
      for(var i=0; i<radio.length; i++){
         if(radio[i].checked){
         sideValue = radio[i].value;
         }
      }
   }

//checkbox values
function getCheckValue(){
   if($('cheese').checked){
      cheeseValue = $('cheese').value
   }else{
      cheeseValue = "No"
   }
   
}
//toggles links for display page
function togCont(n){
   switch(n){
      case "on":
         $('burgerMaker').style.display = "none";
         $('clear').style.display = "inline";
         $('displayData').style.display = "none";
         $('addContent').style.display = "inline";
         break;
      case "off":
         $('burgerMaker').style.display = "block";
         $('clear').style.display = "inline";
         $('displayData').style.display = "inline";
         $('addContent').style.display = "none";
         $('item').style.display = "none";
         break;
      default:
         break;
      
   }
}
//saveData function
   function saveData(){
      var id = Math.floor(Math.random()*9999999)
//Gather all form field data in an object.
//Object properies will contain an array wit hte form labal and input value.
      getSelectedRadio();
      getCheckValue();
      var item = {};
         item.sName = ["Server's Name:", $('sName').value];
         item.tDate = ["Today's Date:", $('tDate').value];
         item.tNum = ["Table Number:", $('tNum').value];
         item.temps = ["Temperature:", $('temps').value];
         item.cheese = ["Cheese?:", cheeseValue];
         item.cond = ["Special Notes:", $('cond').value];
         item.side = ["Sides", sideValue];
//Save data into local storage. Use stringify to convert object to a string.
      localStorage.setItem(id, JSON.stringify(item));
      alert("Order is Placed");
}
//function to display data to browser
   function getData(){
      togCont("on");
      if(localStorage.length === 0){
         alert("There is no data found in the local storage.");
      }
      var createDiv = document.createElement('Div');
      createDiv.setAttribute("id", "item");
      var createList = document.createElement('ul');
      createDiv.appendChild(createList);
      document.body.appendChild(createDiv);
      $('item').style.display = "block";
      for(var i=0, j=localStorage.length; i<j; i++){
         var createli = document.createElement('li');
         createList.appendChild(createli);
         var key = localStorage.key(i);
         var value = localStorage.getItem(key);
//convert string back to object
         var infoObj = JSON.parse(value);
         var createSubList = document.createElement('ul');
         createli.appendChild(createSubList);
         for(var y in infoObj){
            var createSubli = document.createElement('li');
            createSubList.appendChild(createSubli);
            var optSubText = infoObj[y] [0] +" "+ infoObj[y] [1];
            createSubli.innerHTML = optSubText
         }
         
      }
    
   }
//function for clearing data
   function clearData(){
      localStorage.clear();
      alert("You have deleted the order.");
      window.location.reload();
}
//Array for my temperature drop down
    var meatTemp = ["--Choose A Temp--", "Rare", "Med-Rare", "Medium", "Med-Well", "Well"],
         sideValue,
         cheeseValue = "No";
    makeDrop();
    
//links and submit button

    var displayData = $('displayData');
    displayData.addEventListener("click", getData);
   var clear = $('clear');
    clear.addEventListener("click", clearData);
    var save = $('submit');
    save.addEventListener("click", saveData);
   
});