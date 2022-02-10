var teams = {};

function preloadTeams() {
    let teamTransparency = 0.2;

    teams.NONE = new Team("rgba(0,0,0,0)","#FFFF00");
    teams.BLUE = new Team(`rgba(0,127,255,${teamTransparency})`,"#00FFFF");
    teams.BLACK = new Team(`rgba(0,0,0,${teamTransparency})`,"#777777");
    teams.YELLOW = new Team(`rgba(255,200,0,${teamTransparency})`,"#FFAA00");
    teams.WHITE = new Team(`rgba(255,255,255,${teamTransparency})`,"#FFFFFF");
    teams.GREEN = new Team(`rgba(0,255,0,${teamTransparency})`,"#00FF00");
}

class Team {
    color;
    highlightColor;

    constructor(c,h) {
        this.highlightColor = h;
        this.color = c;
    }
}