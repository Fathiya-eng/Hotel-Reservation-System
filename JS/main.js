fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    displayRooms(data.rooms.slice(0,3));
  });

function displayRooms(rooms) {
  let cards = "";

  rooms.forEach(room => {
    cards += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow">

          <div style="height:200px;background:#ccc;"></div>

          <div class="card-body">
            <h5>${room.name}</h5>
            <span class="badge bg-primary">${room.type}</span>
            <p>${room.description}</p>
            <p><strong>$${room.price}/night</strong></p>
          </div>

        </div>
      </div>
    `;
  });

  document.getElementById("roomsContainer").innerHTML = cards;
}