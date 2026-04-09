// ------------------------ Featured Rooms (index.html) ------------------------
const container = document.getElementById("roomsContainer");

if (container) {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const featuredRooms = data.rooms.slice(0, 3);
      let cards = "";

      featuredRooms.forEach(room => {
        cards += `
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img src="${room.image}"
     class="card-img-top"
     alt="${room.name}"
     onerror="this.src='https://via.placeholder.com/300x200'">
              <div class="card-body">
                <h5 class="card-title">${room.name}</h5>
                <span class="badge bg-primary mb-2">${room.type}</span>
                <p class="card-text">RO${room.price} / night</p>
                <p>⭐ ${room.rating}</p>
                <p class="card-text">${room.description}</p>
                <button 
                  class="btn btn-primary book-now"
                  data-id="${room.id}"
                  ${!room.available ? "disabled" : ""}>
                  ${room.available ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = cards;

      // Book Now logic
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("book-now")) {
          const id = e.target.getAttribute("data-id");
          const selectedRoom = data.rooms.find(r => r.id == id);
          localStorage.setItem("selectedRoom", JSON.stringify(selectedRoom));
          alert("Room selected! Redirecting to booking page...");
          window.location.href = "booking.html";
        }
      });
    })
    .catch(error => console.error("Error loading rooms:", error));
}

// ------------------------ Booking Form (booking.html) ------------------------
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  // Set today's date
  let today = new Date().toISOString().split("T")[0];
  document.getElementById("checkin").min = today;

  document.getElementById("checkin").addEventListener("change", function () {
    document.getElementById("checkout").min = this.value;
  });

  // Load selected room
  const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
  let roomPrice = selectedRoom ? selectedRoom.price : 50;

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;
    let guests = document.getElementById("guests").value;
    let requests = document.getElementById("requests").value.trim();

    let valid = true;
    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    if (name === "") { document.getElementById("nameError").innerText = "Required"; valid = false; }
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) { document.getElementById("emailError").innerText = "Invalid email"; valid = false; }
    if (phone === "") { document.getElementById("phoneError").innerText = "Required"; valid = false; }
    if (checkin === "") { document.getElementById("checkinError").innerText = "Required"; valid = false; }
    if (checkout === "") { document.getElementById("checkoutError").innerText = "Required"; valid = false; }
    if (checkin && checkout && checkout <= checkin) { document.getElementById("checkoutError").innerText = "Must be after check-in"; valid = false; }
    if (guests === "") { document.getElementById("guestsError").innerText = "Required"; valid = false; }
    if (requests === "") { document.getElementById("requestsError").innerText = "Required"; valid = false; }
    if (!valid) return;

    let nights = (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);
    let total = nights * roomPrice;

    document.getElementById("summary").style.display = "block";
    document.getElementById("summaryText").innerHTML = `
      ${selectedRoom ? `<img src="${selectedRoom.image}"
     alt="${selectedRoom.name}"
     style="width:100%; max-width:400px;"
     onerror="this.src='https://via.placeholder.com/400x300'">` : ""}
      Name: ${name} <br>
      Email: ${email} <br>
      Phone: ${phone} <br>
      Guests: ${guests} <br>
      Check-in: ${checkin} <br>
      Check-out: ${checkout} <br>
      Nights: ${nights} <br>
      Price per night: RO${roomPrice} <br>
      Total: RO${total} <br>
      Requests: ${requests}
    `;
  });

  document.querySelector("button[type='reset']").addEventListener("click", function () {
    document.getElementById("summary").style.display = "none";
  });
}