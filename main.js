// Firebase конфіг
const firebaseConfig = {
    apiKey: "AIzaSyDTqQbagHh-HLAdNI56wEsgayUSNcmDJyg",
    authDomain: "webkv-6a265.firebaseapp.com",
    projectId: "webkv-6a265",
    storageBucket: "webkv-6a265.appspot.com",
    messagingSenderId: "261103939337",
    appId: "1:261103939337:web:7981bbce2a277693026dd8",
    measurementId: "G-3QQR2K785N"
};

// Ініціалізація
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Генеруємо дати
const startDate = new Date("2025-05-13");
const days = 60;
const rooms = ["Кімната 1", "Кімната 2", "Кімната 3"];
const entries = [];

for (let i = 0; i < days; i += 2) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const displayDate = `${day}.${month}.${year}`;
    const isoDate = `${year}-${month}-${day}`;

    const room = rooms[(i / 2) % 3];
    entries.push({ displayDate, isoDate, room });
}

// Вставляємо рядки в таблицю
const tbody = document.getElementById("scheduleBody");
entries.forEach(entry => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${entry.displayDate}</td>
        <td>${entry.room}</td>
        <td><input type="checkbox" id="${entry.isoDate}_${entry.room}"></td>
    `;
    tbody.appendChild(tr);

    const checkbox = document.getElementById(`${entry.isoDate}_${entry.room}`);
    const docRef = db.collection("cleaning_schedule").doc(`${entry.isoDate}_${entry.room}`);
    docRef.get().then(doc => {
        if (doc.exists) {
            checkbox.checked = doc.data().is_cleaned;
        }
    });
});

// Збереження
document.getElementById("cleaningForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const promises = [];

    entries.forEach(entry => {
        const checkbox = document.getElementById(`${entry.isoDate}_${entry.room}`);
        const isCleaned = checkbox.checked;

        const docRef = db.collection("cleaning_schedule").doc(`${entry.isoDate}_${entry.room}`);
        promises.push(docRef.set({ is_cleaned: isCleaned }));
    });

    Promise.all(promises)
        .then(() => showSuccessMessage())
        .catch(err => console.error("Помилка збереження:", err));
});

function showSuccessMessage() {
    const msg = document.getElementById("successMessage");
    msg.style.visibility = "visible";
    msg.style.opacity = "1";
    setTimeout(() => {
        msg.style.opacity = "0";
        msg.style.visibility = "hidden";
    }, 3000);
}
