const btnShowPassword = document.querySelectorAll('.input-toggle');

btnShowPassword.forEach((button) => {
    button.addEventListener('click', () => {
        const dataIdPassword = button.getAttribute('data-password');
        const inputId = document.getElementById(dataIdPassword)

        const openEye = button.querySelector('.open-eye');
        const closeEye = button.querySelector('.close-eye');

        if (inputId.type === "password") {
            inputId.type = "text";
            openEye.style.display = 'none';
            closeEye.style.display = 'block';

        } else {
            inputId.type = "password"
            openEye.style.display = 'block';
            closeEye.style.display = 'none';
        }
    });
});


function checkStrength(value) {
    let strength = 0;

    if (value.length >= 8) strength++;           // tem 8+ caracteres
    if (/[A-Z]/.test(value)) strength++;         // tem letra maiúscula
    if (/[0-9]/.test(value)) strength++;         // tem número
    if (/[^A-Za-z0-9]/.test(value)) strength++;  // tem símbolo especial

    const bars = [
        document.getElementById('bar1'),
        document.getElementById('bar2'),
        document.getElementById('bar3'),
        document.getElementById('bar4')
    ]

    let colorClass = '';

    if (strength <= 2) colorClass = 'filled-weak';
    else if (strength === 3) colorClass = 'filled-medium';
    else if (strength === 4) colorClass = 'filled-strong';

    bars.forEach((bar, index) => {
        bar.classList.remove('filled-weak', 'filled-medium', 'filled-strong');

        if (index < strength) {
            bar.classList.add(colorClass);
        }
    });

    const labels = {
        0: '',
        1: 'Muito fraca',
        2: 'Fraca',
        3: 'Média',
        4: 'Forte'
    }

    document.getElementById('strength-label').textContent = labels[strength]



}

