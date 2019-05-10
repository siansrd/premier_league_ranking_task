const calc = require('../ranking_calculator.js');
const leagueData = require('../../data/16_17_league_data.json');
const match = leagueData.rounds[0].matches[0];
const drawMatch = leagueData.rounds[0].matches[4];

describe('Ranking Calculator', () => {

  test('calculator exists', () => {
    expect(calc).toBeTruthy();
  });

  test('generate unique team list', () => {
    const teamList = {
      hull: { name: 'Hull City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }, 
      leicester: { name: 'Leicester City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }, 
      burnley: { name: 'Burnley', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      swansea: { name: 'Swansea', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      crystalpalace: { name: 'Crystal Palace', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      westbrom: { name: 'West Bromwich Albion', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      everton: { name: 'Everton', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      tottenham: { name: 'Tottenham Hotspur', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      middlesbrough: { name: 'Middlesbrough', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      stoke: { name: 'Stoke City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      southampton: { name: 'Southampton', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      watford: { name: 'Watford', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      mancity: { name: 'Manchester City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      sunderland: { name: 'Sunderland', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      bournemouth: { name: 'Bournemouth', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      manutd: { name: 'Manchester United', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      arsenal: { name: 'Arsenal', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      liverpool: { name: 'Liverpool', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      chelsea: { name: 'Chelsea', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      westham: { name: 'West Ham United', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    }

    const matchDay1 = leagueData.rounds[0].matches;
    expect(calc.generateTeamList(matchDay1)).toEqual(teamList);
  });

  test('calculate goal differences for a match', () => {
    expect(calc.calculateGoalDifferences(match)).toEqual({ hull: 1, leicester: -1 });
  });

  test('update goal differences for a match', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const withGD = calc.updateGoalDifferences(teamsList, match);
    expect(withGD[match.team1.key].goalDifference).toBe(1);
    expect(withGD[match.team2.key].goalDifference).toBe(-1);
  });

  test('do not update goal differences for a match with a draw', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const withGD = calc.updateGoalDifferences(teamsList, drawMatch);
    expect(withGD[match.team1.key].goalDifference).toBe(0);
    expect(withGD[match.team2.key].goalDifference).toBe(0);
  });

  test('calculate points for a match', () => {
    const pointsScheme = { win: 3, loss: 0, draw: 1};
    expect(calc.calculatePoints(match, pointsScheme)).toEqual({ hull: 3, leicester: 0 });
  });

  test('update points for a match with a win/lose', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};
    const teamsWithPoints = calc.updatePoints(teamsList, match, pointsScheme);
    expect(teamsWithPoints[match.team1.key].points).toBe(3);
    expect(teamsWithPoints[match.team2.key].points).toBe(0);
  });

  test('update points for a match with a draw', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};
    const teamsWithPoints = calc.updatePoints(teamsList, drawMatch, pointsScheme);
    expect(teamsWithPoints[drawMatch.team1.key].points).toBe(1);
    expect(teamsWithPoints[drawMatch.team2.key].points).toBe(1);
  });

  test('calculate winner for a match', () => {
    expect(calc.calculateWinnerLoser(match)).toEqual({ winner: 'hull', loser: 'leicester' });
  });

  test('calculate no winner for a match when there is a draw', () => {
    expect(calc.calculateWinnerLoser(drawMatch)).toBeNull();
  });

  test('update teams wins and losses for a match', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    calc.updateWinsLosses(teamsList, match);

    expect(teamsList[match.team1.key].wins).toBe(1);
    expect(teamsList[match.team1.key].losses).toBe(0);
    expect(teamsList[match.team2.key].wins).toBe(0);
    expect(teamsList[match.team2.key].losses).toBe(1);
  });

  test('does not update teams wins and losses when there is a draw', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    calc.updateWinsLosses(teamsList, drawMatch);

    expect(teamsList[match.team1.key].wins).toBe(0);
    expect(teamsList[match.team1.key].losses).toBe(0);
    expect(teamsList[match.team2.key].wins).toBe(0);
    expect(teamsList[match.team2.key].losses).toBe(0);
  });

  test('update teams goals for and goals against for a match', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    calc.updateGoals(teamsList, match);

    expect(teamsList[match.team1.key].goalsFor).toBe(2);
    expect(teamsList[match.team1.key].goalsAgainst).toBe(1);
    expect(teamsList[match.team2.key].goalsFor).toBe(1);
    expect(teamsList[match.team2.key].goalsAgainst).toBe(2);
  });

  test('update wins/losses, goals for/against, goal difference and points for a match', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};
    calc.updateResultsForMatch(teamsList, match, pointsScheme);

    expect(teamsList[match.team1.key].wins).toBe(1);
    expect(teamsList[match.team1.key].losses).toBe(0);
    expect(teamsList[match.team2.key].wins).toBe(0);
    expect(teamsList[match.team2.key].losses).toBe(1);

    expect(teamsList[match.team1.key].goalsFor).toBe(2);
    expect(teamsList[match.team1.key].goalsAgainst).toBe(1);
    expect(teamsList[match.team2.key].goalsFor).toBe(1);
    expect(teamsList[match.team2.key].goalsAgainst).toBe(2);

    expect(teamsList[match.team1.key].goalDifference).toBe(1);
    expect(teamsList[match.team2.key].goalDifference).toBe(-1);

    expect(teamsList[match.team1.key].points).toBe(3);
    expect(teamsList[match.team2.key].points).toBe(0);
  });

  test('update results for all matches in one day', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};

    calc.updateResultsForDay(teamsList, matchDay1, pointsScheme)

    const updatedteamList = {
      hull: { name: 'Hull City', wins: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 }, 
      leicester: { name: 'Leicester City', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 }, 
      burnley: { name: 'Burnley', wins: 0, losses: 1, goalsFor: 0, goalsAgainst: 1, goalDifference: -1, points: 0 },
      swansea: { name: 'Swansea', wins: 1, losses: 0, goalsFor: 1, goalsAgainst: 0, goalDifference: 1, points: 3 },
      crystalpalace: { name: 'Crystal Palace', wins: 0, losses: 1, goalsFor: 0, goalsAgainst: 1, goalDifference: -1, points: 0 },
      westbrom: { name: 'West Bromwich Albion', wins: 1, losses: 0, goalsFor: 1, goalsAgainst: 0, goalDifference: 1, points: 3 },
      everton: { name: 'Everton', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      tottenham: { name: 'Tottenham Hotspur', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      middlesbrough: { name: 'Middlesbrough', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      stoke: { name: 'Stoke City', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      southampton: { name: 'Southampton', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      watford: { name: 'Watford', wins: 0, losses: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
      mancity: { name: 'Manchester City', wins: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
      sunderland: { name: 'Sunderland', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 },
      bournemouth: { name: 'Bournemouth', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
      manutd: { name: 'Manchester United', wins: 1, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
      arsenal: { name: 'Arsenal', wins: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 0 },
      liverpool: { name: 'Liverpool', wins: 1, losses: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 3 },
      chelsea: { name: 'Chelsea', wins: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
      westham: { name: 'West Ham United', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 }
    }

    expect(teamsList).toEqual(updatedteamList);
  });

  test('update results for multiple days', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const matchDay2 = leagueData.rounds[1].matches;
    const rounds = [{matches: matchDay1}, {matches: matchDay2}];
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};

    calc.updateResultsForRounds(rounds, teamsList, pointsScheme);

    const updatedteamList = {
      hull: { name: 'Hull City', wins: 2, losses: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 6 }, 
      leicester: { name: 'Leicester City', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 1 }, 
      burnley: { name: 'Burnley', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
      swansea: { name: 'Swansea', wins: 1, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 3 },
      crystalpalace: { name: 'Crystal Palace', wins: 0, losses: 2, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 },
      westbrom: { name: 'West Bromwich Albion', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
      everton: { name: 'Everton', wins: 1, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 4 },
      tottenham: { name: 'Tottenham Hotspur', wins: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 4 },
      middlesbrough: { name: 'Middlesbrough', wins: 1, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 4 },
      stoke: { name: 'Stoke City', wins: 0, losses: 1, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 1 },
      southampton: { name: 'Southampton', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
      watford: { name: 'Watford', wins: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 1 },
      mancity: { name: 'Manchester City', wins: 2, losses: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 6 },
      sunderland: { name: 'Sunderland', wins: 0, losses: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 0 },
      bournemouth: { name: 'Bournemouth', wins: 0, losses: 2, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 0 },
      manutd: { name: 'Manchester United', wins: 2, losses: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 6 },
      arsenal: { name: 'Arsenal', wins: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 1 },
      liverpool: { name: 'Liverpool', wins: 1, losses: 1, goalsFor: 4, goalsAgainst: 5, goalDifference: -1, points: 3 },
      chelsea: { name: 'Chelsea', wins: 2, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 6 },
      westham: { name: 'West Ham United', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 }
    };

    expect(teamsList).toEqual(updatedteamList);
  });


  xtest('sort team list', () => {
    const matchDay1 = leagueData.rounds[0].matches;
    const matchDay2 = leagueData.rounds[1].matches;
    const rounds = [{matches: matchDay1}, {matches: matchDay2}];
    const teamsList = calc.generateTeamList(matchDay1);
    const pointsScheme = { win: 3, loss: 0, draw: 1};

    calc.updateResultsForRounds(rounds, teamsList, pointsScheme);

    const rankedTeamList = [
      { name: 'Manchester City', wins: 2, losses: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 6, rank: 1 },
      { name: 'Manchester United', wins: 2, losses: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 6, rank: 2 },
      { name: 'Hull City', wins: 2, losses: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 6, rank: 3 }, 
      { name: 'Chelsea', wins: 2, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 6, rank: 4 },
      { name: 'Everton', wins: 1, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 4, rank: 5 },
      { name: 'Middlesbrough', wins: 1, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 4, rank: 6 },
      { name: 'Tottenham Hotspur', wins: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 4, rank: 7 },
      { name: 'Burnley', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3, rank: 8 },
      { name: 'West Bromwich Albion', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3, rank: 9 },
      { name: 'West Ham United', wins: 1, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3, rank: 10 },
      { name: 'Liverpool', wins: 1, losses: 1, goalsFor: 4, goalsAgainst: 5, goalDifference: -1, points: 3, rank: 11 },
      { name: 'Swansea', wins: 1, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 3, rank: 12 },
      { name: 'Arsenal', wins: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 1, rank: 13 },
      { name: 'Watford', wins: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 1, rank: 14 },
      { name: 'Leicester City', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 1, rank: 15 }, 
      { name: 'Southampton', wins: 0, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1, rank: 16 },
      { name: 'Stoke City', wins: 0, losses: 1, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 1, rank: 17 },
      { name: 'Sunderland', wins: 0, losses: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 0, rank: 18 },
      { name: 'Crystal Palace', wins: 0, losses: 2, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0, rank: 19 },
      { name: 'Bournemouth', wins: 0, losses: 2, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 0, rank: 20 }
    ];
    
    expect(calc.sortTeams(teamsList)).toEqual(rankedTeamList);
  });

});