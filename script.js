const container = document.querySelector('.container');
const seats  = document.querySelectorAll('.row .seat:not(occupied)');
let count = document.getElementById('count');
let total = document.getElementById('total');
let movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value



 populateUi();





function updateSelectedCount(){
  let selectedSeats = document.querySelectorAll('.container .seat.selected')

  selectedSeatsAray = [...selectedSeats].map(s => [...seats].indexOf(s) )

localStorage.setItem('selectedSeats',JSON.stringify(selectedSeatsAray))

  let selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount*ticketPrice
}

 function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectedMovie', [movieIndex,moviePrice])
 }

movieSelect.addEventListener('change',e=>{
  ticketPrice = e.target.value
  let movieIndex = e.target.selectedIndex
  let moviePrice = e.target.value
  setMovieData(movieIndex,moviePrice);
  updateSelectedCount();


})
 
// Get data from local storage and populate Ui

function populateUi(){
  let selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'))
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat,index)=>{
      if (selectedSeats.indexOf(index)>-1) {
        seat.classList.add('selected')
      }
    })
  }
 
}
 



container.addEventListener('click',e=>{
 if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){

  e.target.classList.toggle('selected')

  updateSelectedCount()



 }
});