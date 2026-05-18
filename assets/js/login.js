/*=================================================
    VARIAVEIS GLOBAIS
===================================================*/
// Armazena os dados do user logado retornados pelo supabase
let currentUser = null;

// guarda temporariamente o botão da aba que estava ativo antes do clique
let activeAtual;

//Busca o formulário usando o ID 'login'
const formLogin = document.getElementById('login');

//Toda logica pra fazer o login, recebendo e enviando os dados do login 
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();//Vai impedir que o submit faça sua função padrao
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Espera a resposta da funçao "signIn" e passa pro data
    const data = await signIn(email, password);

    //Se o data for valido, redireciona o user pra pagina principal, se nao aparece uma mensagem de erro
    if (data) window.location.href = 'index.html';
    else {
        const errorMsg = document.getElementById('error-message')
        errorMsg.style.display = 'block'
    }
});

//Busca o botao usando o ID 'google'
const googleBtn = document.getElementById('google');

//Quando o user clicar no botao, vai chamar a funçao de login com o google
googleBtn.addEventListener('click', async () => {
    await loginWithGoogle();
});

//Busca o formulário usando o ID 'register'
const formRegister = document.getElementById('register');

//Toda logica pra fazer o registro do user, recebendo e enviando os dados do cadastro 
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value;
    const lastName = document.getElementById('reg-lastname').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm').value;

    //Vai confirma se as senhas sao a mesmas, se for, vai chamar a funçao de cadastra e enviar pra pagina de confirma email
    if (password === confirmPassword) {
        await signUp(email, password, name, lastName)
        window.location.href = `confirm.html?email=${email}`
    }
    else {
        const errorMsg = document.getElementById('error-message-register')
        errorMsg.style.display = 'block'
        return;
    }

});


//Toda a logica para mudar o aparecimento do form login e register
function switchTab() {
    const tab = document.querySelectorAll('.tab');

    tab.forEach((button) => {

        button.addEventListener('click', (e) => {
            activeAtual = document.querySelector('.tab.active');

            if (activeAtual) {
                activeAtual.classList.remove('active');
            }

            button.classList.add('active');

            let classbtn = button.className

            if (classbtn.includes('login')) {
                document.querySelector('.panel').style.display = 'none'
                document.querySelector('.form-body').style.display = 'flex'
            }
            if (classbtn.includes('register')) {
                document.querySelector('.panel').style.display = 'block'
                document.querySelector('.form-body').style.display = 'none'
            }

        });
    });
}

switchTab()

async function initLogin() {
    // Pega o elemento do loader no HTML
    const loader = document.getElementById('page-loader');

    try {
        // Executa a checagem atual e joga na variável global
        currentUser = await checkSession();

        // se o user estiver  logado, manda pra pagina inicial
        if (currentUser) {
            window.location.href = 'index.html';
            return;
        }

        // Se tudo deu certo remove o travamento e esconde o loader
        document.body.classList.remove('loading');
        if (loader) loader.classList.add('hidden');

    } catch (error) {
        console.error("Erro crítico na inicialização:", error);

        document.body.classList.remove('loading');

        if (loader) {
            loader.classList.add('hidden');
        }
    }
}

initLogin();
