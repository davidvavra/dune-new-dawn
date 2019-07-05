import { Component } from '@angular/core';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // https://afeld.github.io/emoji-css/
  countries: SelectRow[] = [
    {value: 'em-flag-iq', name: 'Irák'},
    {value: 'em-flag-ir', name: 'Írán'},
    {value: 'em-gb', name: 'Velká Británie'}
  ];
  primaryActions: Action[] = [
    {df: 0, visibility: 'public', type: 'main'},
    {df: 0, visibility: 'public', type: 'main'},
    {df: 0, visibility: 'public', type: 'main'}
  ]
  secondaryActions: Action[] = [
    {df: 0, visibility: 'public', type: 'support'}
  ]
  actionTypes: SelectRow[] = [
    {value: 'support', name: "Podpora"},
    {value: 'economic', name: "Ekonomika"},
    {value: 'elections', name: "Volby"},
    {value: 'other', name: "Jiné"}
  ]
  visibilities: SelectRow[] = [
    {value: 'public', name: "Veřejná"},
    {value: 'covert', name: "Tajná vůči delegacím"},
    {value: 'private', name: "Tajná uvnitř delegace"}
  ]
  sent = false
  availableDf = 60
  remainingDf = this.availableDf

  calculateRemainingDf(action: Action, newValue: number) {
    action.df = newValue
    let primarySum = this.primaryActions.reduce((sum, current) => sum + current.df, 0)
    let secondarySum = this.secondaryActions.reduce((sum, current) => sum + current.df, 0)
    this.remainingDf = this.availableDf - primarySum - secondarySum
  }

  addSecondaryAction() {
    this.secondaryActions.push(
      {df: 0, visibility: 'public', type: 'support'}
    )
  }

  send() {
    this.sent = true;
  }
}

export interface SelectRow {
  value: string; 
  name: string;
}

export interface Action {
  df: number;
  visibility: string;
  type: string;
}