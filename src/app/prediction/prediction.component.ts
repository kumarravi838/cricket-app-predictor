import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  id: number;
  name: string;
  team: string;
  runs: number[];
  wickets: number[];
  strikeRate: number[];
  totalRuns?: number;
  totalWickets?: number;
  avgStrikeRate?: number;
  performanceScore?: number;
  predictedRuns?: number;
  predictedWickets?: number;
  predictedStrikeRate?: number;
}

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
  imports: [CommonModule],
})
export class PredictionComponent implements OnInit {
  players: Player[] = [
    { id: 1, name: ' Ryan Rickelton † ', team: 'Team A', runs:[61,58,11, 24, 31, 41, 17, 10, 62, 6], wickets: [0, 0, 0], strikeRate: [153, 151, 148] },
    { id: 2, name: 'Rohit Sharma ,', team: 'Team A', runs: [53, 12, 70, 76, 26, 18, 17, 13, 8, 0], wickets: [0, 0, 0], strikeRate: [135, 136, 137] },
    { id: 3, name: 'Suryakumar Yadav   ', team: 'Team A', runs: [68, 40, 54, 48, 26, 68, 59, 49, 62, 48, 12], wickets: [0, 0, 0], strikeRate: [153.26, 152, 151] },
    { id: 4, name: 'Hardik Pandya (c)', team: 'Team A', runs: [48, 5, 21, 2, 42, 28, 11], wickets: [2, 0, 2, 0, 1, 0, 1], strikeRate: [142, 143, 145] },
    { id: 5, name: ' Will Jacks ', team: 'Team A', runs: [0, 29, 22, 0, 36, 1, 22, 5, 16, 11], wickets: [0, 2, 0, 0, 0, 0, 0, 2, 0, 1], strikeRate: [155, 151, 152] },
    { id: 6, name: 'tilak', team: 'Team A', runs: [39, 0, 25, 56, 59, 21, 0, 2, 0, 6], wickets: [0, 0, 0], strikeRate: [146, 148, 147] },
    { id: 7, name: 'Naman', team: 'Team A', runs: [0, 0, 25, 0, 0, 38, 11, 46, 18], wickets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], strikeRate: [182, 160, 145] },
    { id: 8, name: 'Corbin boach', team: 'Team A', runs: [0, 20, 0], wickets: [ 0, 1, 0], strikeRate: [114] },
    { id: 9, name: 'Deepak, ', team: 'Team A', runs: [0, 1, 0, 0, 0, 0, 0], wickets: [1, 0, 2 ,1, 0, 1,0,0,2,1], strikeRate: [98] },
    { id: 10, name: 'Trend Bold', team: 'Team A', runs: [0, 1, 0, 0, 0, 0,0], wickets: [3, 3, 4, 0, 1, 0,2,1,1,1], strikeRate: [77.] },
    { id: 11, name: 'Jasprit Bhumrah', team: 'Team A', runs: [0, 0, 0, 0, 0, 1], wickets: [2,4, 1, 2, 1, 1,0], strikeRate: [42] },
    { id: 12, name: 'Sai Sudharsan  ,', team: 'Team B', runs: [48,39,52,36,56, 82, 5, 49, 63, 74], wickets: [0, 0, 0, 0, 0], strikeRate: [134, 134, 138] },
    { id: 13, name: 'Shubman Gill  ', team: 'Team B', runs: [76,84,90,7,60, 2, 61, 14, 38, 33], wickets: [0, 0, 0, 0, 0], strikeRate: [152, 148, 149] },
    { id: 14, name: 'Jos Buttler † †', team: 'Team B', runs: [64,50,41,97,16, 36, 0, 73, 39, 54], wickets: [0, 0, 0, 0, 0], strikeRate: [145, 142, 146] },
    { id: 15, name: 'Washington Sundar  ', team: 'Team B', runs: [21,13,0,2, 49], wickets: [0,0,1,1, 0], strikeRate: [119, 130] },
    { id: 16, name: 'Rutherford ', team: 'Team B', runs: [22, 7, 35, 30, 7], wickets: [0, 0, 0, 0, 0, 0], strikeRate: [136, 136, 143] },
    { id: 17, name: 'M Shahrukh Khan ', team: 'Team B', runs: [11, 36, 0, 0, 9], wickets: [0, 0, 0], strikeRate: [138] },
    { id: 18, name: ' Rahul Tewatia  ', team: 'Team B', runs: [0, 24, 0, 0, 0], wickets: [0, 1, 4, 1, 3], strikeRate: [142] },
    { id: 19, name: 'Rashid Khan  ', team: 'Team B', runs: [4, 12, 0, 0, 6], wickets: [1, 2, 0, 0, 0], strikeRate: [146] },
    { id: 20, name: 'P Krishna,  ', team: 'Team B', runs: [0, 0, 0, 1, 6], wickets: [2, 1, 2, 4, 2,3,2,1], strikeRate: [149] },
    { id: 21, name: 'Sai Kishore ,', team: 'Team B', runs: [0, 0, 0, 0, 0], wickets: [0, 2, 2, 2, 1], strikeRate: [104] },
    { id: 22, name: 'M Shiraj ', team: 'Team B', runs: [0, 0, 0, 0, 0], wickets: [2,0,1,1,0, 1, 4, 3, 2], strikeRate: [87] },
  ];

  topPlayers: Player[] = [];
  topTeams: { teamName: string, totalPerformanceScore: number }[] = [];

  // Define weights for recent performance (adjust as needed)
  recentWeight = 0.6;
  olderWeight = 0.4;
  recentMatchCount = 3; // Consider the last 3 matches as 'recent'

  constructor() { }

  ngOnInit(): void {
    this.predictTopPlayers();
    this.predictTopTeams();
  }

  predictTopPlayers() {
    this.players.forEach(player => {
      player.predictedRuns = this.weightedAverage(player.runs, this.recentMatchCount, this.recentWeight, this.olderWeight);
      player.predictedWickets = this.weightedAverage(player.wickets, this.recentMatchCount, this.recentWeight, this.olderWeight);
      player.predictedStrikeRate = this.weightedAverage(player.strikeRate, this.recentMatchCount, this.recentWeight, this.olderWeight);
      player.performanceScore = this.calculatePerformanceScore(player);
    });

    this.players.sort((a, b) => b.performanceScore! - a.performanceScore!);
    this.topPlayers = this.players.slice(0, 11);
  }

  weightedAverage(data: number[], recentCount: number, recentWeight: number, olderWeight: number): number {
    const n = data.length;
    if (n === 0) {
      return 0; // Or handle differently, like returning a default value
    }

    let weightedSum = 0;
    let totalWeight = 0;

    const recentData = data.slice(Math.max(0, n - recentCount));
    const olderData = data.slice(0, Math.max(0, n - recentCount));

    recentData.forEach(value => {
      weightedSum += value * recentWeight;
      totalWeight += recentWeight;
    });

    olderData.forEach(value => {
      weightedSum += value * olderWeight;
      totalWeight += olderWeight;
    });

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  // You might want to create separate performance scores for batsmen and bowlers
  calculatePerformanceScore(player: Player): number {
    const runsWeight = 0.5;
    const wicketsWeight = 0.3;
    const strikeRateWeight = 0.2;

    return (
      (player.predictedRuns! * runsWeight) +
      (player.predictedWickets! * wicketsWeight) +
      (player.predictedStrikeRate! * strikeRateWeight)
    );
  }

  predictTopTeams() {
    const teamPerformanceMap: { [key: string]: number } = {};

    this.topPlayers.forEach(player => {
      const team = player.team;
      const performanceScore = player.performanceScore || 0;

      if (!teamPerformanceMap[team]) {
        teamPerformanceMap[team] = 0;
      }

      teamPerformanceMap[team] += performanceScore;
    });

    this.topTeams = Object.entries(teamPerformanceMap).map(([teamName, totalPerformanceScore]) => {
      return { teamName, totalPerformanceScore };
    });

    this.topTeams.sort((a, b) => b.totalPerformanceScore - a.totalPerformanceScore);
    this.topTeams = this.topTeams.slice(0, 3);
  }
}