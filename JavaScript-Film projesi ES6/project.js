const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1]
const clear = document.getElementById("clear-films")

//Tüm evenleri yükleme
eventListeners();

function eventListeners(){
        form.addEventListener("submit",addFilms);
        document.addEventListener("DOMContentLoaded",function(){
            let films = Storage.getFilmsFromStorage();
            UI.loadAllFilms(films); 
            
        });
        cardbody.addEventListener("click",deleteFilm);
        clear.addEventListener("click",clearAllFilms);

}
function addFilms(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        UI.displayMessaages("Tüm alanları doldurun...","danger");


    }else{
        const newFilm = new Film(title,director,url)
        UI.addFilmToUI(newFilm)
        Storage.addFilmToStorage(newFilm);
        UI.displayMessaages("Film Başarıyla Eklendi...","success")
    }


    UI.clearInputs(titleElement,urlElement,directorElement); 
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        
        UI.displayMessaages("Silme işlemi başarılı","success");

    }
}
function clearAllFilms(){
    if(confirm("Eminmmisin?")){
        UI.clearAllFilmsFromUI()
    Storage.clearAllFilmsFromStorage();

    }
}