
//Verifica se o supabaseClient existe, se nao existir cria ele com "var" pra que possa ser usado fora do escopo
if (typeof supabaseClient === 'undefined') {
    const { createClient } = supabase;
    // recebe a url e key pra acessar o banco de dados
    var supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Recebe o email e senha do user pra validar o login
async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        console.error(error);

        return null;
    }

    return data;
}

// Recebe o email, senha, nome e sobrenome pra cadastrar um novo usuario
async function signUp(email, password, name, lastName) {
    const { data, error } = await supabaseClient.auth.signUp(
        {
            email,
            password,

            options: {
                data: {
                    first_name: name,
                    last_name: lastName
                }
            }
        });

    if (error) {
        console.error(error);

        return null;
    }

    return data;
}


async function loginWithGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Para onde o usuário deve voltar após fazer o login no Google
            redirectTo: 'https://ldvxodwqzbbmzmnerhqb.supabase.co/auth/v1/callback', 
            // força o Google a sempre pedir para escolher a conta
            queryParams: {
                access_type: 'offline',
                prompt: 'select_account',
            },
        },
    });

    if (error) {
        console.error("Erro ao autenticar com Google:", error.message);
        alert("Erro no login: " + error.message);
    }

    return data;
}

// recebe o email cadastrado e o token pra ativar e permitir o acesso do email
async function verifyEmail(email, token) {
    const { data, error } = await supabaseClient.auth.verifyOtp({ email, token, type: 'signup' });

    if (error) {
        console.error(error);

        return null;
    }
    return data;

}

//Vai reenviar o codigo pro email cadastrado
async function resendToken(email) {
    const { data, error } = await supabaseClient.auth.resend({
        type: 'signup',
        email: email,
    })

    if(error){
        console.error(error);
        return null;
    }

    return data;
}

//Checa se o usuário está logado. Se não estiver, envia pro login.html; se estiver, retorna o ID dele
async function checkSession() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return null;
    }
    
    // Usando Optional Chaining (?.) e Nullish Coalescing (??) para evitar erros
    return session?.user ?? null;

}

//encerra a sessao do usuario
async function signOut() {
    const { data, error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error(error)

        return null;
    }

    return data;

}