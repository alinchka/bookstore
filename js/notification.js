let notificationCounter = 0;
let intervalId;
function createNotification() {
    const notificationList = document.querySelector('.notifications-list');
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification');
    newNotification.textContent = "Уведомление";
    const productDelete = document.createElement("button");
    productDelete.classList.add("popup__product-delete");
    productDelete.innerHTML = "&#10006;";
    newNotification.appendChild(productDelete);
    notificationList.appendChild(newNotification);
    notificationCounter++;
    updateCounter();
    productDelete.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        event.target.parentNode.remove(); // Удаляем уведомление при клике на крестик
        notificationCounter--;
        updateCounter();
      }
    });
}

function updateCounter() {
  const counter = document.querySelector('.p-circle');
  counter.textContent = notificationCounter;
}

intervalId = setInterval(createNotification, 45000);
