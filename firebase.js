// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD1c7Z9h6WCiK6k70r6dOpeB7VDqYuhXVo",
  authDomain: "pubilc-transport-schedular.firebaseapp.com",
  projectId: "pubilc-transport-schedular",
  storageBucket: "pubilc-transport-schedular.firebasestorage.app",
  messagingSenderId: "432531481706",
  appId: "1:432531481706:web:6e6be986a404bacf63d613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch bus routes
export async function fetchBusRoutes() {
  try {
    const querySnapshot = await getDocs(collection(db, "routes"));
    console.log("Fetched documents:", querySnapshot.size);

    let busRoutesHTML = "";

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        busRoutesHTML += `<div class="routes">
                            <h3>Route: ${data.name || 'N/A'}</h3>
                            <p>Details: ${data.schedule || 'No schedule available'}</p>
                          </div>`;
      });
    } else {
      busRoutesHTML = "<p>No routes available.</p>";
    }

    // Display the routes
    document.getElementById("route-container").innerHTML = busRoutesHTML;

  } catch (error) {
    console.error("Error fetching bus routes:", error);
  }
}
