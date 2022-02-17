class Team {
    color;
    highlightColor;
    name;
    claimed;

    constructor(cla,n="",c="rgba(0,0,0,0)",h="#FFFF00") {
        this.claimed = cla;
        this.name = n;
        this.highlightColor = h;
        this.color = c;
    }
}

var teams = {};
var teamNames = ["PLAYER","PIRATES","NOMADS","ESKIMOS","PYGMIES"];

let teamTransparency = 0.2;

teams.NONE = new Team(false);
teams.PLAYER = new Team(true, "PLAYER", `rgba(0,127,255,${teamTransparency})`,"#00FFFF");
teams.PIRATES = new Team(true, "PIRATES", `rgba(0,0,0,${teamTransparency})`,"#777777");
teams.NOMADS = new Team(true, "NOMADS", `rgba(255,200,0,${teamTransparency})`,"#FFAA00");
teams.ESKIMOS = new Team(true, "ESKIMOS", `rgba(255,255,255,${teamTransparency})`,"#FFFFFF");
teams.PYGMIES = new Team(true, "PYGMIES", `rgba(0,255,0,${teamTransparency})`,"#00FF00");



export { Team, teams, teamNames};