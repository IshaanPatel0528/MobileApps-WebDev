//fetch and display user data
const{createClient}= window.supabase;

const supabaseURL = "https://ikdntbrckydncsgjvkdu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZG50YnJja3lkbmNzZ2p2a2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNzEsImV4cCI6MjAzOTY0NzM3MX0._Xu0E7kvUheliPbfLXiO9uQ_CWVDE3_scGhgXdFOAVM";

const supabase = createClient(supabaseURL, supabaseAnonKey);

const profileDataDiv = document.getElementById("profile-data");

let session = null;

async function getSession() {
    session = await supabase.auth.getSession();
    return session;
}

getSession().then(session => {
    console.log(session);
}).catch (error => {
    console.log('Error fetching session: ', error);
});

async function getUserProfile () {
    const {data: userProfile, error} = await supabase.from('table_1').select('*');

    if (error) {
        console.log("Error fetching user data: ", error);
        return null;
    }
    return userProfile;
}

async function fetchProfile() {
    const { data: session } = await supabase.auth.getSession();
    const userProfile = await getUserProfile(session);
    if (userProfile) {
        console.log('User Profile:', userProfile);
        profileDataDiv.innerHTML = `<p><strong>First Name: </strong> ${userProfile[0].firstname}</p>` +
            `<p><strong>Last Name: </strong> ${userProfile[0].lastname}</p>` +
            `<p><strong>City: </strong> ${userProfile[0].city}</p>` +
            `<p><strong>Email: </strong> ${userProfile[0].email}</p>`;
    } else {
        profileDataDiv.innerHTML = `<p>No user profile found.</p>`;
    }
}

fetchProfile().catch((error) => {
    console.log ('Error:', error);
})