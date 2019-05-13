const rankingCalculator = {

  generateTeamList(firstRound) {
    return firstRound.matches.reduce((list, {team1, team2}) => {
      list[team1.key] = { 
        name: team1.name, 
        wins: 0, losses: 0, 
        goalsFor: 0, 
        goalsAgainst: 0, 
        goalDifference: 0, 
        points: 0 };
      list[team2.key] = { 
        name: team2.name, 
        wins: 0, 
        losses: 0, 
        goalsFor: 0, 
        goalsAgainst: 0, 
        goalDifference: 0, 
        points: 0 };
      return list;
    }, {})
  },

  calculateGoalDifferences(match) {
    result = {};
    result[match.team1.key] = match.score1 - match.score2;
    result[match.team2.key] = match.score2 - match.score1;
    return result;
  },

  assignGoalDifferences(teams, match) {
    const goalDifferences = this.calculateGoalDifferences(match);
    const teamsWithGD = {...teams};
    for (const result in goalDifferences) {
      teams[result].goalDifference += goalDifferences[result];
    }  
    return teamsWithGD;
  },

  calculatePoints(match, pointScheme) {
    const result = {};
    if (match.score1 === match.score2) {
      result[match.team1.key] = pointScheme.draw;
      result[match.team2.key] = pointScheme.draw;
    } else if (match.score1 - match.score2 > 0) {
      result[match.team1.key] = pointScheme.win;
      result[match.team2.key] = pointScheme.loss;
    } else {
      result[match.team1.key] = pointScheme.loss;
      result[match.team2.key] = pointScheme.win;
    }
    return result;
  },

  assignPoints(teams, match, pointScheme) {
    const points = this.calculatePoints(match, pointScheme); 
    const teamsWithPoints = {...teams};
    for (const result in points) {
      teamsWithPoints[result].points += points[result];
    } 
    return teamsWithPoints;
  },

  calculateWinnerLoser(match) {
    if (match.score1 === match.score2) return null;
    const result = {};
    if (match.score1 - match.score2 > 0) {
      result.winner = match.team1.key;
      result.loser = match.team2.key;
    } else {
      result.winner = match.team2.key;
      result.loser = match.team1.key;
    }
    return result;
  },

  assignWinsLosses(teams, match) {
    const result = this.calculateWinnerLoser(match);
    if (!result) return teams;
    const teamsWithWinsLosses = {...teams};
    teamsWithWinsLosses[result.winner].wins += 1;
    teamsWithWinsLosses[result.loser].losses += 1;
    return teamsWithWinsLosses;
  },

  assignGoals(teams, match) {
    const teamsWithGoals = {...teams};
    teamsWithGoals[match.team1.key].goalsFor += match.score1;
    teamsWithGoals[match.team1.key].goalsAgainst += match.score2;
    teamsWithGoals[match.team2.key].goalsFor += match.score2;
    teamsWithGoals[match.team2.key].goalsAgainst += match.score1;
    return teamsWithGoals;
  },

  assignResultsForMatch(teams, match, pointScheme) {
    const teamsWithPoints = this.assignPoints(teams, match, pointScheme);
    const teamsWithDG = this.assignGoalDifferences(teamsWithPoints, match);
    const teamsWithGoals = this.assignGoals(teamsWithDG, match);
    return this.assignWinsLosses(teamsWithGoals, match);
  },

  assignResultsForDay(teams, round, pointsScheme) {
    return round.matches.reduce((teamsWithValues, match) => {
      return {...this.assignResultsForMatch(
        teamsWithValues, 
        match, 
        pointsScheme
      )};
    }, teams);
  },

  assignResultsForRounds(rounds, teams, pointsScheme) {
    return rounds.reduce((teamsWithValues, round) => {
      return {...this.assignResultsForDay(
        teamsWithValues, 
        round, 
        pointsScheme
      )};
    }, teams);
  },

  getTeamKeys(teams) {
    return Object.keys(teams);
  },

  getSortedTeamKeys(teams) {
    const keys = this.getTeamKeys(teams);
    keys.sort((teamKey1, teamKey2) => {
      return (
        teams[teamKey2].points - teams[teamKey1].points 
        || teams[teamKey2].goalDifference - teams[teamKey1].goalDifference 
        || teams[teamKey2].goalsFor - teams[teamKey1].goalsFor
        || 0
      );
    });
    return keys;
  },

  teamsRankEqually(team1, team2) {
    return ( 
      team1.points === team2.points 
      && team1.goalDifference === team2.goalDifference 
      && team1.goalsFor === team2.goalsFor 
    ) 
  },

  rankTeam(team, prevTeam, index) {
    const rankedTeam = {...team};
    if (index === 0) {
      rankedTeam.rank = 1;
    } else if (this.teamsRankEqually(prevTeam, team)) {
      rankedTeam.rank = prevTeam.rank;
    } else {
      rankedTeam.rank = prevTeam.rank + 1;
    }
    return rankedTeam;
  },

  sortTeams(teams) {
    const sortedKeys = this.getSortedTeamKeys(teams);
    return sortedKeys.reduce((rankedTeams, teamKey, index) => {
      const team = teams[teamKey];
      const prevTeam = rankedTeams[index - 1];
      const rankedTeam = this.rankTeam(team, prevTeam, index);
      return [...rankedTeams, rankedTeam];
    }, []);
  },

  getRounds(leagueData) {
    return leagueData.rounds;
  },

}

module.exports = rankingCalculator;