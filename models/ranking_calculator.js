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
    for (const result in goalDifferences) {
      teamsList[result].goalDifference = goalDifferences[result];
    }   
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
    for (const result in points) {
      teamsList[result].points = points[result];
    } 
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
    if (!result) return;
    teamsList[result.winner].wins += 1;
    teamsList[result.loser].losses +=1;
  },

  updateGoals(teamsList, match) {
    teamsList[match.team1.key].goalsFor += match.score1;
    teamsList[match.team1.key].goalsAgainst += match.score2;
    teamsList[match.team2.key].goalsFor += match.score2;
    teamsList[match.team2.key].goalsAgainst += match.score1;
  }

}

module.exports = rankingCalculator;