let allRooms = [];

// جلب البيانات
fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    allRooms = data.rooms;
    displayRooms(allRooms);
  });

// عناصر الفلترة
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

// تحديث السعر المعروض
priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
  filterRooms();
});

// فلترة عند الكتابة
searchInput.addEventListener("input", filterRooms);
typeFilter.addEventListener("change", filterRooms);

// دالة الفلترة
function filterRooms() {
  const searchText = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;
  const maxPrice = priceRange.value;

  const filtered = allRooms.filter(room => {
    return (
      room.name.toLowerCase().includes(searchText) &&
      (selectedType === "" || room.type === selectedType) &&
      room.price <= maxPrice
    );
  });

  displayRooms(filtered);
}

// عرض الغرف
function displayRooms(rooms) {
  const container = document.getElementById("roomsContainer");

  if (rooms.length === 0) {
    container.innerHTML = `<p class="text-center">No rooms found</p>`;
    return;
  }

  let cards = "";

  rooms.forEach(room => {
    cards += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="./ASSETS/room${room.id}.jpg"> 
               class="card-img-top"
               onerror="this.src='https://via.placeholder.com/300x200'">

          <div class="card-body">
            <h5>${room.name}</h5>

            <span class="badge bg-primary">${room.type}</span>

            <p class="mt-2">$${room.price} / night</p>

            <p>${room.rating}</p>

            <p>${room.description}</p>

            <button 
              class="btn btn-primary book-now"
              data-id="${room.id}"
              ${!room.available ? "disabled" : ""}
            >
              ${room.available ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = cards;
}

// الحجز + localStorage
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("book-now")) {
    const id = e.target.getAttribute("data-id");

    const selectedRoom = allRooms.find(r => r.id == id);

    localStorage.setItem("selectedRoom", JSON.stringify(selectedRoom));

    alert("Room saved! Redirecting to booking page...");

    window.location.href = "booking.html";
  }
});