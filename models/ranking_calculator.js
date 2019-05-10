const rankingCalculator = {

  generateTeamList(matches) {
    return matches.reduce((list, {team1, team2}) => {
      list[team1.key] = { name: team1.name, wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
      list[team2.key] = { name: team2.name, wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
      return list;
    }, {})
  },

  calculateGoalDifferences(match) {
    result = {};
    result[match.team1.key] = match.score1 - match.score2;
    result[match.team2.key] = match.score2 - match.score1;
    return result;
  },

  updateGoalDifferences(teamsList, match) {
    const goalDifferences = this.calculateGoalDifferences(match);
    const teamsWithGD = {...teamsList}
    for (const result in goalDifferences) {
      teamsList[result].goalDifference += goalDifferences[result];
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

  updatePoints(teamsList, match, pointScheme) {
    const points = this.calculatePoints(match, pointScheme); 
    const teamsWithPoints = {...teamsList};
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

  updateWinsLosses(teamsList, match) {
    const result = this.calculateWinnerLoser(match);
    if (!result) return teamsList;
    const teamsListWithWinsLosses = {...teamsList};
    teamsListWithWinsLosses[result.winner].wins += 1;
    teamsListWithWinsLosses[result.loser].losses += 1;
    return teamsListWithWinsLosses;
  },

  updateGoals(teamsList, match) {
    const teamsWithGoals = {...teamsList};
    teamsWithGoals[match.team1.key].goalsFor += match.score1;
    teamsWithGoals[match.team1.key].goalsAgainst += match.score2;
    teamsWithGoals[match.team2.key].goalsFor += match.score2;
    teamsWithGoals[match.team2.key].goalsAgainst += match.score1;
    return teamsWithGoals;
  },

  updateResultsForMatch(teamsList, match, pointScheme) {
    const teamsWithPoints = this.updatePoints(teamsList, match, pointScheme);
    const teamsWithDG = this.updateGoalDifferences(teamsWithPoints, match);
    const teamsWithGoals = this.updateGoals(teamsWithDG, match);
    return this.updateWinsLosses(teamsWithGoals, match);
  },

  updateResultsForDay(teamsList, matches, pointsScheme) {
    return matches.reduce((teamsListWithValues, match) => {
      return {...this.updateResultsForMatch(teamsList, match, pointsScheme)};
    }, teamsList);
  },

  updateResultsForRounds(rounds, teamsList, pointsScheme) {
    return rounds.reduce((teamsListWithValues, round) => {
      return {...this.updateResultsForDay(teamsList, round.matches, pointsScheme)};
    }, teamsList);
  },

  getTeamKeys(teamsList) {
    return Object.keys(teamsList);
  },

  getSortedTeamKeys(teamsList) {
    const keys = this.getTeamKeys(teamsList);
    keys.sort((teamKey1, teamKey2) => {
      if (teamsList[teamKey1].points > teamsList[teamKey2].points) return -1;
      if (teamsList[teamKey1].points < teamsList[teamKey2].points) return 1;
      if (teamsList[teamKey1].goalDifference > teamsList[teamKey2].goalDifference) return -1;
      if (teamsList[teamKey1].goalDifference < teamsList[teamKey2].goalDifference) return 1;
      if (teamsList[teamKey1].goalsFor > teamsList[teamKey2].goalsFor) return -1;
      if (teamsList[teamKey1].goalsFor < teamsList[teamKey2].goalsFor) return 1; 
      return 0;
    })
    return keys;
  },

  sortTeams(teamsList) {
    const teamKeys = this.getTeamKeys(teamsList);
    
    teamKeys.sort((teamKey1, teamKey2) => {
      if (teamsList[teamKey1].points > teamsList[teamKey2].points) return -1;
      if (teamsList[teamKey1].points < teamsList[teamKey2].points) return 1;
      if (teamsList[teamKey1].goalDifference > teamsList[teamKey2].goalDifference) return -1;
      if (teamsList[teamKey1].goalDifference < teamsList[teamKey2].goalDifference) return 1;
      if (teamsList[teamKey1].goalsFor > teamsList[teamKey2].goalsFor) return -1;
      if (teamsList[teamKey1].goalsFor < teamsList[teamKey2].goalsFor) return 1; 
      return 0;
    })
    
    return teamKeys.map((teamKey, index) => {
      const team = teamsList[teamKey];
      team.rank = index + 1;
      return team;
    })   
  }

}

module.exports = rankingCalculator;