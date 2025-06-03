let box = document.querySelector(".box");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let btn = document.querySelector(".learn-more");
let error = document.querySelector(".error");
let errorPass = document.querySelector(".error-pass");

let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let regexNumber = /^\d{10}$/;

let emailSet = ``;
let passSet = ``;
let numberSet = ``;
let otp = ``;

for (let i = 0; i < 6; i++) {
  otp += Math.floor(Math.random() * 10); // adds random digit (0-9)
}
console.log(otp);

function checkEmail() {
  let emailValue = document.getElementById("email").value;
  emailSet = emailValue;

  if (!regexEmail.test(emailSet)) {
    error.innerHTML = "Enter valid email !";
  } else {
    error.innerHTML = "";
  }
}

function checkPass() {
  let passValue = document.getElementById("password").value;
  passSet = passValue;

  if (!regexPass.test(passSet)) {
    errorPass.innerHTML = "Password must have 8+ chars, A-Z, a-z, 0-9 & special char.";
  } else {
    errorPass.innerHTML = "";
  }
}

function checkNumber() {
  let number = document.getElementById("number").value;
  numberSet = number;

  let errorNum = document.querySelector(".error-num");

  if (!regexNumber.test(numberSet)) {
    errorNum.innerHTML = "Please enter a valid 10-digit phone number.";
  } else {
    errorNum.innerHTML = "";
  }
}

function resetForm() {
  box.innerHTML = `
    <div class="w-[86%] h-[80%] flex-col flex justify-around mt-3">
      <div class="flex justify-between items-center">
        <label for="newPass">New pass</label>
        <input type="text" id="newPass" class="border rounded-2xl outline-none h-[36px] px-3" placeholder="Enter new pass">
      </div>

      <div class="flex justify-between items-center">
        <label for="confirm">Confirm pass</label>
        <input type="text" id="confirm" class="border rounded-2xl outline-none h-[36px] px-3" placeholder="Enter pass again">
      </div>

      <div class="flex justify-between items-center">
        <label for="otp-enter">OTP</label>
        <input type="number" id="otp-enter" class="border rounded-2xl outline-none h-[36px] px-3" placeholder="Enter OTP">
      </div>

      <div class="flex justify-center items-center">
        <button class="learn-more save-pass">Save</button>
      </div>
    </div>
  `;
}

function attachForgotListener() {
  let forgot = document.querySelector(".forgot-pass");
  if (!forgot) return;

  forgot.addEventListener("click", function () {
    box.innerHTML = `
      <div class="w-[86%] h-[50%] flex-col flex justify-around mt-3">
        <div class="flex justify-between items-center">
          <label for="Number">Number</label>
          <input type="Number" id="number" class="border rounded-2xl outline-none h-[36px] px-3" oninput="checkNumber()" placeholder="Enter number">
        </div>
        <div class="my-1">
          <p class="error-num text-[15px] text-[red] font-[900]"></p>
        </div>
        <div class="flex justify-center items-center">
          <button class="learn-more number-btn">Get OTP</button>
        </div>
      </div>
    `;

    let numberBtn = document.querySelector(".number-btn");
    numberBtn.addEventListener("click", function () {
      let numberLocal = localStorage.getItem("number");

      if (!numberLocal) {
        localStorage.setItem("number", numberSet);
        alert(`OTP ${otp}`);
        resetForm();
      } else if (numberLocal !== numberSet) {
        alert(`Enter correct number`);
        return;
      } else {
        alert(`OTP ${otp}`);
        resetForm();
      }

      let savePass = document.querySelector(".save-pass");
      savePass.addEventListener("click", function () {
        let otpEnter = document.getElementById("otp-enter").value;
        let newPass = document.getElementById("newPass").value;
        let confirm = document.getElementById("confirm").value;

        if (otp == otpEnter && newPass == confirm) {
          if (!regexPass.test(confirm)) {
            alert("New password is not strong enough!");
            return;
          }

          localStorage.removeItem("password");
          localStorage.setItem("password", confirm);

          box.innerHTML = `
            <div class="w-[86%] h-[50%] flex-col flex justify-around mt-3">
              <div class="flex justify-between items-center">
                <label for="Email">Email</label>
                <input type="email" id="email" class="border rounded-2xl outline-none h-[36px] px-3" oninput="checkEmail()" placeholder="ex: h@gmail.com">
              </div>

              <div class="my-1">
                <p class="error text-[15px] text-[red] font-[900]"></p>
              </div>

              <div class="flex justify-between items-center">
                <label for="E">Password</label>
                <input type="password" id="password" class="border rounded-2xl outline-none h-[36px] px-3" oninput="checkPass()" placeholder="Enter password">
              </div>

              <div class="my-1">
                <p class="error-pass text-[15px] text-[red] font-[900]"></p>
              </div>

              <div class="flex justify-end pe-5">
                <h5 class="forgot-pass hover:text-pink-800 duration-[0.3s] cursor-grab">Forgot ?</h5>
              </div>

              <div class="flex justify-center items-center">
                <button class="learn-more login-btn">Login</button>
              </div>
            </div>
          `;

          let loginBtn = document.querySelector(".login-btn");
          let forgotPass = document.querySelector(".forgot-pass");

          loginBtn.addEventListener("click", function () {
            let loginEmail = document.getElementById("email").value;
            let loginPass = document.getElementById("password").value;

            let emailLocal = localStorage.getItem("email");
            let passLocal = localStorage.getItem("password");

            if (loginEmail === emailLocal && loginPass == passLocal) {
              document.body.innerHTML = `<h1 class="text-6xl font-bold">Logged In</h1>`;
            } else {
              alert("Invalid Email or Password!");
            }
          });

          attachForgotListener();
        } else {
          alert("OTP or password confirmation does not match!");
        }
      });
    });
  });
}

btn.addEventListener("click", function btnForm() {
  checkEmail();
  checkPass();

  if (regexEmail.test(emailSet) && regexPass.test(passSet)) {
    localStorage.setItem("email", emailSet);
    localStorage.setItem("password", passSet);

    let emailLocal = localStorage.getItem("email", emailSet);
    let passLocal = localStorage.getItem("password", passSet);

    box.innerHTML = `
      <div class="w-[86%] h-[50%] flex-col flex justify-around mt-3">
        <div class="flex justify-between items-center">
          <label for="Email">Email</label>
          <input type="email" id="email" class="border rounded-2xl outline-none h-[36px] px-3" oninput="checkEmail()" placeholder="ex: h@gmail.com">
        </div>

        <div class="my-1">
          <p class="error text-[15px] text-[red] font-[900]"></p>
        </div>

        <div class="flex justify-between items-center">
          <label for="E">Password</label>
          <input type="password" id="password" class="border rounded-2xl outline-none h-[36px] px-3" oninput="checkPass()" placeholder="Enter password">
        </div>

        <div class="my-1">
          <p class="error-pass text-[15px] text-[red] font-[900]"></p>
        </div>

        <div class="flex justify-end pe-5">
          <h5 class="forgot-pass hover:text-pink-800 duration-[0.3s] cursor-grab">Forgot ?</h5>
        </div>

        <div class="flex justify-center items-center">
          <button class="learn-more login-btn">Login</button>
        </div>
      </div>
    `;

    let loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener("click", function () {
      let newEmail = document.getElementById("email");
      let newPass = document.getElementById("password");

      let emailVal = newEmail.value;
      let passVal = newPass.value;

      if (
        regexEmail.test(emailVal) &&
        regexPass.test(passVal) &&
        emailVal === emailLocal &&
        passVal === passLocal
      ) {
        document.body.innerHTML = `<h1 class="text-6xl font-bold">Logged In</h1>`;
      } else {
        alert("Invalid Email or Password !");
        newEmail.value = "";
        newPass.value = "";
      }
    });

    let forgot = document.querySelector(".forgot-pass");
    forgot.addEventListener("click", function () {
      attachForgotListener();
    });
  } else {
    alert("Invalid !");
  }
});
