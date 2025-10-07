 import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "./firebase.js";

// sinhup
const signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter both email and password.",
        confirmButtonColor: "#3f51b5",
      });
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      await Swal.fire({
        icon: "success",
        title: "Sign Up Successful!",
        text: "Your account has been created. Please login now.",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.href = "login.html";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: err.message,
        confirmButtonColor: "#3f51b5",
      });
    }
  });
}

// logun
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("lemail").value;
    const password = document.getElementById("lpassword").value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter your email and password.",
        confirmButtonColor: "#3f51b5",
      });
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.href = "registration.html";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.message,
        confirmButtonColor: "#3f51b5",
      });
    }
  });
}

// logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.href = "index.html";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed!",
        text: err.message,
        confirmButtonColor: "#3f51b5",
      });
    }
  });
}

// authsatecheck
onAuthStateChanged(auth, (user) => {
  const page = window.location.pathname.split("/").pop();

  if (!user && page === "registration.html") {
    Swal.fire({
      icon: "warning",
      title: "Not Logged In!",
      text: "Please login to continue.",
      confirmButtonColor: "#3f51b5",
    }).then(() => {
      window.location.href = "index.html";
    });
  }

  if (user && page === "login.html") {
    window.location.href = "registration.html";
  }
});

//  savebtn
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const fullName = document.getElementById("fullName").value;
    const classTimings = document.getElementById("classTimings").value;
    const campus = document.getElementById("campus").value;
    const teacher = document.getElementById("teacher").value;
    const course = document.getElementById("course").value;

    if (!fullName || !classTimings || !campus || !teacher || !course) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all fields.",
        confirmButtonColor: "#3f51b5",
      });
    }

    //  studentdetails 
    const studentDetailContainer = document.getElementById("studentDetailContainer");
    const detailBox = document.createElement("div");
    detailBox.className = "box student-detail-box";
    detailBox.innerHTML = `
      <h2 class="head">Student Detail</h2>
      <label><strong>Name:</strong> ${fullName}</label><br><br>
      <label><strong>Class Timings:</strong> ${classTimings}</label><br><br>
      <label><strong>Campus:</strong> ${campus}</label><br><br>
      <label><strong>Teacher:</strong> ${teacher}</label><br><br>
      <label><strong>Course:</strong> ${course}</label><br><br>
      <button class="delete-btn">Delete</button>
    `;
    studentDetailContainer.appendChild(detailBox);

    // delete 
    const deleteBtn = detailBox.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This will delete the student details!",
        showCancelButton: true,
        confirmButtonColor: "#3f51b5",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          detailBox.remove();
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Student details have been deleted.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    });

    // Clearinput 
    document.getElementById("fullName").value = "";
    document.getElementById("classTimings").value = "";
    document.getElementById("campus").value = "";
    document.getElementById("teacher").value = "";
    document.getElementById("course").value = "";

    Swal.fire({
      icon: "success",
      title: "Saved Successfully!",
      text: "Student details have been saved.",
      showConfirmButton: false,
      timer: 2000,
    });
  });
}