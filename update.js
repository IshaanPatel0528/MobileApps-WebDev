// Initial Supabase setup
const { createClient } = window.supabase;

const supabaseURL = "https://ikdntbrckydncsgjvkdu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZG50YnJja3lkbmNzZ2p2a2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNzEsImV4cCI6MjAzOTY0NzM3MX0._Xu0E7kvUheliPbfLXiO9uQ_CWVDE3_scGhgXdFOAVM";

const supabase = createClient(supabaseURL, supabaseAnonKey);

const updateMessage = document.getElementById("update-message");
const updateForm = document.getElementById("update-form");

async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Session error: ", error);
        return null;
    }
    return session;
}

async function getUserProfile() {
    const session = await getSession();
    if (!session) {
        return null;
    }
    const { data: userProfile, error } = await supabase.from('table_1').select('*').eq('email', session.user.email).single(); //Did this for specific row or else values were not printing

    if (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
    return userProfile;
}

async function changeProfile() {
    const userProfile = await getUserProfile();
    if (userProfile) {
        document.getElementById("firstName").value = userProfile.firstname;
        document.getElementById("lastName").value = userProfile.lastname;
        document.getElementById("city").value = userProfile.city;
    } else {
        updateMessage.innerHTML = "No user profile found.";
    }
}


updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const city = document.getElementById("city").value;

    const session = await getSession();
    if (!session) {
        updateMessage.innerHTML = "User is not logged in.";
        return;
    }

    const { error } = await supabase
        .from('table_1')
        .update({ firstname: firstName, lastname: lastName, city: city })
        .eq('email', session.user.email); // I decided to use email to identify user instead of id because we removed id from the same spot in auth.js

    if (error) {
        updateMessage.innerHTML = "Error: " + error.message;
    } else {
        updateMessage.innerHTML = "Profile Updated";
    }
});

changeProfile().catch((error) => {
    console.log('Error:', error);
});


