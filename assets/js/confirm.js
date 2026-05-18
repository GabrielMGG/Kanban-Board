const params = new URLSearchParams(window.location.search);

const email = params.get('email');

document.querySelector('.confirm-email').textContent = email;

const formToken = document.getElementById('token');

formToken.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.otp-input');

    const token = Array.from(inputs).map(input => input.value).join('');

    await verifyEmail(email, token);
    document.getElementById('confirmView').style.display = 'none';
    document.getElementById('successView').style.display = 'flex';


});


let countdown = 60;
let stopwatch = null;

const resendBtn = document.getElementById('resendBtn');

function resend() {
    clearInterval(stopwatch);
    countdown = 60;
    resendBtn.disabled = true;
    document.getElementById('msg').textContent = 'Reenviar em'

    stopwatch = setInterval(() => {
        document.getElementById('countdown').textContent = countdown + "s";
        console.log(countdown)
        countdown--;




        if (countdown <= 0) {
            clearInterval(stopwatch);

            resendBtn.disabled = false;
            document.getElementById('countdown').textContent = '';
            document.getElementById('msg').textContent = "Reenviar codigo";

        }

        console.log(countdown)
    }, 1000);
}

resendBtn.addEventListener('click', async() => {
    countdown = 60;
    await resendToken(email);
    resend();

});


resend();