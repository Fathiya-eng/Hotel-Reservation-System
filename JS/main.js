fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("roomsContainer");

    // تصفية بعض الغرف إذا أحببت، هنا نأخذ كل الغرف المتاحة
    const featuredRooms = data.rooms.filter(room => room.available);

    featuredRooms.forEach(room => {
      container.innerHTML += `
        <div class="col-12 col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="./ASSETS/room${room.id}.jpg" class="card-img-top" alt="${room.name}">
            <div class="card-body">
              <h5 class="card-title">${room.name}</h5>
              <span class="badge bg-primary mb-2">${room.type}</span>
              <p class="card-text">$${room.price} / night</p>
              <p class="card-text">${room.description}</p>
              <button class="btn btn-primary book-now" data-id="${room.id}">Book Now</button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error(error));