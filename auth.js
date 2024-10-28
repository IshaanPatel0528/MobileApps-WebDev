//initial supabase

const{createClient}= window.supabase;

const supabaseURL = "https://ikdntbrckydncsgjvkdu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZG50YnJja3lkbmNzZ2p2a2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNzEsImV4cCI6MjAzOTY0NzM3MX0._Xu0E7kvUheliPbfLXiO9uQ_CWVDE3_scGhgXdFOAVM";

const supabase = createClient(supabaseURL, supabaseAnonKey);

//login
const loginBtn = document.getElementById("LoginBtn");
loginBtn?.addEventListener("click", async()=> {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const{error, session} = await supabase.auth.signInWithPassword({email, password});

    if (error) {
        document.getElementById("error-msg").textContent = error.message;
    } else {
        window.location.href = 'display.html';
    }
})

//Signup

const signupBtn = document.getElementById("signup-btn");
signupBtn?.addEventListener("click", async()=> {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const city = document.getElementById("city").value;

    const {error: signUpError, user} = await supabase.auth.signUp({email, password});

    if (signUpError) {
        document.getElementById("error-msg").textContent = signUpError.message;
    } else {
        const {error: insertError} = await supabase.from('table_1').insert([{
            firstname: firstName, lastname: lastName, city: city, email: email
        }]);

        if (insertError) {
            document.getElementById("error-msg").textContent = insertError.message;
        } else {
            window.location.href = "index.html";
        }
    }
})


