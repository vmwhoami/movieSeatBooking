const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;


function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.container .seat.selected');

  const selectedSeatsAray = [...selectedSeats].map(s => [...seats].indexOf(s));

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsAray));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovie', [movieIndex, moviePrice]);
}

movieSelect.addEventListener('change', e => {
  ticketPrice = e.target.value;
  const movieIndex = e.target.selectedIndex;
  const moviePrice = e.target.value;
  setMovieData(movieIndex, moviePrice);
  updateSelectedCount();
});

// Get data from local storage and populate Ui

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  let selectedPrice = localStorage.getItem('selectedMovie');

  if (selectedPrice) {
    selectedPrice = selectedPrice.split(',')

  }

  const movieIndex = selectedPrice ? +selectedPrice[0] : null

  // const moviePrice = +selectedPrice[selectedPrice.length - 1];


  if (movieIndex !== null) {
    movieSelect.selectedIndex = movieIndex;
  }
}

populateUi();

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

updateSelectedCount();