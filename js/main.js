var val= document.getElementById("item");

val.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        document.getElementById('add').click();
    }
});


document.getElementById('add').addEventListener('click',function( ){
    var value = document.getElementById('item').value;

    if( value ){
        addItemToDo(value);
    }
    else{
        alert('input field is empty');
    }
    document.getElementById('item').value = "";
});

//function to remove the item from the list
function removeItem(){

    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    parent.removeChild(item);
}

// //function to complete an item of the list
function completeItem(){

     var line = this.parentNode;
     var item  = this.parentNode.parentNode;
    
     var parent = item.parentNode;
     var id = parent.id;

     if(id === "todo"){
         var target = document.getElementById("completed");
         this.innerText = "Undo"; 
    }

    else{
        var target = document.getElementById("todo");
        this.innerText = "done";
    }
    
    target.insertBefore(item, target.childNodes[0]);
     
 }

 //function to edit input field....
function editItem(item){
    var tex = item.parentNode.parentNode.childNodes[1];

    //edit text
    var input = document.createElement('input');
    input.type = "text";
    input.value = tex.innerText;
    input.classList.add('in');
    
    var parent = item.parentNode.parentNode;
    parent.removeChild(tex);
    
    parent.insertBefore(input, parent.childNodes[0]);

    //changing editbutton to save button
    var editbutton = item.parentNode.childNodes[2];

    editbutton.innerHTML = "Save"; 


    input.addEventListener('keyup',function(event){
        if(event.keyCode === 13){
            editbutton.click();
        }
    });

    editbutton.setAttribute('onclick', "saveItem(this)")
}

//save item function....
function saveItem(button){
    var value = button.parentNode.parentNode.childNodes[0].value;

    var parent = button.parentNode.parentNode;
    parent.removeChild(parent.childNodes[0]);

    var lab = document.createElement('label');
    lab.innerText = value;

    parent.append(lab);

    button.innerHTML = 'Edit';

    button.setAttribute('onclick', "editItem(this)");
}

function addItemToDo(text) {

    var list = document.getElementById("todo");

    //text Node...
    var item = document.createElement('li');
    var inputtext = document.createElement('label');
    inputtext.innerText = text;
    
//div for buttons.....
    var buttons = document.createElement('div');
    buttons.classList.add('btn');

    //complete button
    var done = document.createElement('button');
    done.classList.add('done');
    done.innerHTML = "done";

//complete function
    done.addEventListener('click', completeItem);

    //remove button
    var remove = document.createElement('button');
    remove.classList.add('delete');
    remove.innerHTML = "Delete";

//remove fuction
    remove.addEventListener('click', removeItem);

    //edit button
    var edit = document.createElement("button");
    edit.classList.add('edit');
    edit.innerHTML = "Edit";

//function to edit input field
    edit.setAttribute('onclick', 'editItem(this)');    

    buttons.appendChild(done);
    buttons.appendChild(remove);
    buttons.appendChild(edit);
    item.appendChild(buttons);

    item.appendChild(inputtext);

    list.insertBefore(item, list.childNodes[0]);
};