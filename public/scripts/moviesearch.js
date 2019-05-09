var app;

function Init() {
    app = new Vue({
        el: "#app",
        data: {
            login_type: "/Login",
            login_type_options: [
                { value: "/Login", text: "Login" },
                { value: "/NewUser", text: "New User" }
            ],
            show_type: 'search',
            search_results: [],
            selected_item: {},
            username: "",
            password: "",
            score1: 0,
            score2: 0
        },

    });
}

function LoginSearch(event) {
	console.log("HERE");
    if (app.username !== "") {
        GetJson(app.login_type + "?" + app.username + "?" + app.password).then((data) => {
		console.log(data);
		if(data == "invalid username or password")
		{
			alert("invalid username or password");
		}
		else if(data == "username already taken")
		{
			alert("username already taken");
		}
		else
		{
            app.show_type = 'game';
	    	app.search_results = data;
			console.log(app.show_type);
			console.log(data);
			//var gamePage = document.getElementById("gameCanvas");
            //gamePage.style.display = "inline-block";
			//window.location.href = "../game.html";

		}
        });
    }
}
function getLeaderBoard(event){
    GetJson(app.username).then((data) => {
        app.leaders = data;
       	console.log(app.leaders);
    }, "json");
}
function GetUser(user) {
    console.log("GetUser --> " + user);
    GetJson(user).then((data) => {
        app.selected_item = data;
       	console.log(app.selected_item);
	 app.show_type = 'game'
    }, "json");
}

function GetName(name) {
    /*console.log("GetName --> " + name);
    GetJson(name).then((data) => {
        var known_titles = data.known_for_titles.split(",");
        var i;
        var title_promises = [];
        for (i = 0; i < known_titles.length; i++) {
            title_promises.push(GetJson("/titles/" + known_titles[i]));
        }
        Promise.all(title_promises).then(results) => {
            app.selected_item = data;
            app.selected_item.known_for_titles = "";
            for (i = 0; i < results.length; i++) {
                app.selected_item.known_for_titles += results[i].primary_title + ", ";
            }
            app.show_type = 'name';
        });
}, "json");*/
}
function GetJson(url, query) {
    return new Promise((resolve, reject) => {
        $.get(url, (data) => {
            resolve(data);
        }, "json");
    });
}
/*var app;

function Init() {
    app = new Vue({
        el: "#app",
        data: {
            user: "/Username",
            pass: "/Password",
		    statsResults: [],
		    show_type: 'landing',
            selected_user: {},
            username: "",
            login_type: "/Login",
            login_type_options: [
                { value: "/Login", text: "Login" },
                { value: "/New_User", text: "New User" }
            ],

        }
        methods{
            loginSearch: function {
                console.log(loginSearch);
                var newUserPage = document.getElementById("login");
                newUserPage.style.display = "none";
                var landingPage = document.getElementById("new_user");
                landingPage.style.display = "none";
                var newUserPage = document.getElementById("game");
                newUserPage.style.display = "inline-block";
                console.log(this.username);
                Stats(this.user);
            }
        }
        }
    });
}
function loginSearch(event){
    if (app.username !== "") {
        {
            console.log(loginSearch);
            var newUserPage = document.getElementById("login");
            newUserPage.style.display = "none";
            var landingPage = document.getElementById("new_user");
            landingPage.style.display = "none";
            var newUserPage = document.getElementById("game");
            newUserPage.style.display = "inline-block";
            console.log(this.username);
            Stats(this.user);
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

/*function Stats(username) {
    console.log("Logining In --> " + username);
        GetJson(username).then((data) => {
            var scores = data.known_for_titles.split(",");

            var score_promises = [];
            for (i = 0; i < known_titles.length; i++) {
                title_promises.push(GetJson("/titles/" + known_titles[i]));
            }
            Promise.all(score_promises).then(results) => {
                app.selected_item = data;
                app.selected_item.known_for_titles = "";
                for (i = 0; i < results.length; i++) {
                    app.selected_item.known_for_titles += results[i].primary_title + ", ";
                }
                app.show_type = 'name';
            });
    }, "json");
}


function GetJson(url, query) {
        return new Promise ((resolve, reject)=> {
        $.get(url, (data) => {
                resolve(data);
        }, "json");
        });
}
*/
