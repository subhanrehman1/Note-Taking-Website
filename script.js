window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//calling shownotes function to fetch already existing data

showNotes();
function showNotes() {
    // var values = [],
    keys = Object.keys(localStorage);
    console.log(keys);
    i = keys.length;
    let html = "";
    if(i==0){
        html+=`<div>
        <p>Nothing to show here, use Add section above to add your notes here</p>
        </div>`;
        document.getElementById("note-container").innerHTML = html;
    }
    while (i--) {
        // values.push(localStorage.getItem(keys[i]));
        html += `<div class="note" id="note-${keys[i]}">
        <h3>${keys[i]}</h3>
        <p>${localStorage.getItem(keys[i])}</p>
        <div><button class="note-button" id="${keys[i]}" onclick="deletenotes(this.id)" >Delete</button><button class="note-button" id="${keys[i]}" onclick="editnotes(this.id)">Edit</button></div>
        </div>`;
    }
    document.getElementById("note-container").innerHTML = html;
}

console.log('welcome to notes app');

let addbtn = document.getElementById('add-button');
addbtn.addEventListener("click", function (e) {
    let addtitle = document.getElementById("add-title");
    let addnote = document.getElementById("add-note");
    localStorage.setItem(addtitle.value, addnote.value);
    addnote.value = "";
    addtitle.value = "";
    showNotes();
    window.scrollTo(0,0);
    document.getElementById("note-added-div").style.display="flex";
    setTimeout(() => {
        document.getElementById("note-added-div").style.display="none";
    }, 3000);
})

function deletenotes(index){
    console.log(index);
    localStorage.removeItem(index);
    showNotes();
    window.scrollTo(0,0);
    document.getElementById("note-delete-div").style.display="flex";
    setTimeout(() => {
        document.getElementById("note-delete-div").style.display="none";
    }, 3000);
}

function editnotes(index){
    let addtitle = document.getElementById("add-title");
    let addnote = document.getElementById("add-note");
    addtitle.value=index;
    addnote.value=localStorage.getItem(index);
    localStorage.setItem(index,addnote.value);
    showNotes();
}

let searchElem=document.getElementById("search-input");

searchElem.addEventListener('input',function(e){
    let searchString=searchElem.value;
    searchString=searchString.toLowerCase();
    keys=Object.keys(localStorage);
    let i=keys.length;
    if(searchString!=null)
    {
        if(i==0){
            html+=`<div>
            <p>Nothing to show here, use Add section above to add your notes here</p>
            </div>`;
            document.getElementById("note-container").innerHTML = html;
        }
        while(i--)
        {
            if(keys[i].toLowerCase().includes(searchString))
            document.getElementById(`note-${keys[i]}`).style.display="block";
            else if(localStorage.getItem(keys[i]).toLowerCase().includes(searchString))
            document.getElementById(`note-${keys[i]}`).style.display="block";
            else
            document.getElementById(`note-${keys[i]}`).style.display="none";
        }    
    }
});
searchElem.addEventListener('input',function(e){
    if(searchElem.value=="")
    {
        showNotes();
    }
});