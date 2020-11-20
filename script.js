const container = document.querySelector('.container');
const seats  = document.querySelectorAll('.row .seat:not(occupied)');
let count = document.getElementById('count');
let total = document.getElementById('total');
let movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value





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
 


container.addEventListener('click',e=>{
 if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){

  e.target.classList.toggle('selected')

  updateSelectedCount()



 }
});