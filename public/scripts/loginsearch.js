var app;

function Init() {
    app = new Vue({
        el: "#app",
        data: {
            user: "/Username",
            pass: "/Password",
		    statsResults: [],
		    show_type: 'landing',
            selected_user: {},
            username: null

        }
    });
}

function loginSearch(event) {
    console.log(loginSearch);
    var newUserPage = document.getElementById("login");
    newUserPage.style.display = "none";
    var landingPage = document.getElementById("new_user");
    landingPage.style.display = "none";
    var newUserPage = document.getElementById("game");
    newUserPage.style.display = "inline-block";

    if (app.login_search !== "") {
        Stats(app.user);
    }
}
function login(event){
	var loginPage = document.getElementById("login");
	 loginPage.style.display = "inline-block";
	var landingPage = document.getElementById("landing_page");
	 landingPage.style.display = "none";

}
function newUser(event){
	var newUserPage = document.getElementById("new_user");
	 newUserPage.style.display = "inline-block";
	var landingPage = document.getElementById("landing_page");
	 landingPage.style.display = "none";

}

function Stats(username) {
    console.log("Logining In --> " + username);
        GetJson(username).then((data) =>
        {
        	app.selected_user =data;
    	}, "json");
}


function GetJson(url, query) {
        return new Promise ((resolve, reject)=> {
        $.get(url, (data) => {
                resolve(data);
        }, "json");
        });
}
