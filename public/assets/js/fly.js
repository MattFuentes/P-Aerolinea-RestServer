const storedFly = JSON.parse(sessionStorage.getItem('saveDestiny')),
    optionFly = document.querySelector('#optionFly');

const loader = () => {
    optionFly.addEventListener('click', optionFlys, false);
}

window.onload = loader;

const optionFlys = (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Reserva realizada!',
        text: 'Se ha realizado la reserva!',
        icon: 'success',
        confirmButtonText: 'Continuar'
    })
    setTimeout(() => {
        location.href = 'index.html'
      }, "4000")
}

storedFly.forEach((fly) => {
    const div = document.createElement('div');
    div.classList.add('optionFly');
    div.innerHTML = `
    <div class="card w-50">
    <div class="card-body">
      <h5 class="card-title">De <span class="checkFly">${fly.originFly}</span> hacia <span class="checkFly">${fly.destinyFly}</span></h5>
      <p class="card-text"><pre>Duración: <span class="checkFly">${fly.travelTime} dias</span>
Equipaje: <span class="checkFly">${fly.baggage}</span>
Tipo de vuelo: <span class="checkFly">${fly.type}</span>
Horario: <span class="checkFly">09:30</span>
Fecha: <span class="checkFly">${fly.dateEnter}</span>
</pre></p>
<button type="submit" class="btn btn-primary mt-4" id="seleccionid">Seleccionar <i
class="fa-solid fa-person-walking-luggage"></i></button>
    </div>
  </div>
  <div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">De <span class="checkFly">${fly.originFly}</span> hacia <span class="checkFly">${fly.destinyFly}</span></h5>
    <p class="card-text"><pre>Duración: <span class="checkFly">${fly.travelTime} dias</span>
Equipaje: <span class="checkFly">${fly.baggage}</span>
Tipo de vuelo: <span class="checkFly">${fly.type}</span>
Horario: <span class="checkFly">12:30</span>
Fecha: <span class="checkFly">${fly.dateEnter}</span>
</pre></p>
<button type="submit" class="btn btn-primary mt-4" id="seleccionid">Seleccionar <i
class="fa-solid fa-person-walking-luggage"></i></button>
  </div>
</div>
<div class="card w-50">
<div class="card-body">
  <h5 class="card-title">De <span class="checkFly">${fly.originFly}</span> hacia <span class="checkFly">${fly.destinyFly}</span></h5>
  <p class="card-text"><pre>Duración: <span class="checkFly">${fly.travelTime} dias</span>
Equipaje: <span class="checkFly">${fly.baggage}</span>
Tipo de vuelo: <span class="checkFly">${fly.type}</span>
Horario: <span class="checkFly">17:30</span>
Fecha: <span class="checkFly">${fly.dateEnter}</span>
</pre></p>
<button type="submit" class="btn btn-primary mt-4" id="seleccionid">Seleccionar <i
class="fa-solid fa-person-walking-luggage"></i></button>
</div>
</div>
    `
    optionFly.appendChild(div);
})