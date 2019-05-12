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
            score2: 0,
			leaders: {},
			statistics: {},
			image: 0,
			imageUrl: "assets/profile1.jpg",
        },
	 watch: {
    		firstName: function()
		{
      			console.log(this.score1);
	   	}
	}
	});
}

function LoginSearch(event) {
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
		    	 app.imageUrl = data[1][0].Image;
		    	 console.log(data);
		    	//showProfile = document.getElementById("gameCanvas");
				//showProfile.style.display = "inline-block";

			//var gamePage = document.getElementById("gameCanvas");
            		//gamePage.style.display = "inline-block";
			//window.location.href = "../game.html";

		}
        });
    }
}
function getLeaderBoard(event){
    GetJson("/LeaderBoard").then((data) => {
        app.leaders = data;
		app.show_type = 'leaders';
       	console.log(app.leaders);
       	app.leaders.sort(function(a, b){return b.BestScore - a.BestScore});
       	console.log(app.leaders);

    }, "json");
}
function getProfile(event){
	console.log( "USERNAME" + app.username);
    GetJson("/Profile" + "?" + app.username).then((data) => {
        app.statistics =data;

        app.show_type = 'profile';
        console.log("PROFILE DATA: " + app.statistics);
    }, "json");
}
function GetUser(user) {
    GetJson(user).then((data) => {
        app.selected_item = data;
       	console.log(app.selected_item);
	 app.show_type = 'game'
    }, "json");
}
function ChooseProfileImage()
{
	showProfile = document.getElementById("profileChoice");
	showProfile.stlye.display = "inline-block";

}

function GetProfileUrl(data)
{
	console.log( "image #:" +  data);
	if(data ==0)
	{
		app.imageUrl = "assets/profile1.jpg";
	}
	else if(data ==1)
	{
		app.imageUrl = "assets/profile2.jpg";
	}
	else if(data ==2)
	{
		app.imageUrl = "assets/profile3.jpg";
	}
	else if(data ==3)
	{
		app.imageUrl = "assets/profile4.jpg";
	}
	else if(data ==4)
	{
		app.imageUrl = "assets/profile5.jpg";
	}
	else if(data ==5)
	{
		app.imageUrl = "assets/profile6.jpg";
	}
	else if(data ==6)
	{
		app.imageUrl = "assets/profile7.jpg";
	}
	else if(data ==7)
	{
		app.imageUrl = "assets/profile8.jpg";
	}
	else if(data ==8)
	{
		app.imageUrl = "assets/profile9.jpg";
	}
	else if(data ==9)
	{
		app.imageUrl = "assets/profile10.jpg";
	}
	else if(data ==10)
	{
		app.imageUrl = "assets/profile11.jpg";
	}
	else if(data ==11)
	{
		app.imageUrl = "assets/profile12.jpg";
	}
	else if(data ==12)
	{
		app.imageUrl = "assets/profile13.jpg";
	}
	else if(data ==13)
	{
		app.imageUrl = "assets/profile14.jpg";
	}
	else if(data ==14)
	{
		app.imageUrl = "assets/profile15.jpg";
	}
	else if(data ==15)
	{
		app.imageUrl = "assets/profile16.jpg";
	}
	InsertProfileImage();
}

function InsertProfileImage(event)
{
    GetJson("/ProfileImage" + "?" + app.username + "?" +  app.imageUrl).then((data) => {
        console.log("PROFILE image DATA: " + data);
    }, "json");
}
function GetJson(url, query) {
    return new Promise((resolve, reject) => {
        $.get(url, (data) => {
            resolve(data);
        }, "json");
    });
}
function SortBestScore(){
	for(var i =0; i< leaders.BestScore; i++)
	{

	}
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
