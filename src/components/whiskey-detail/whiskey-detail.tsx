import { Component, h, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Whiskey } from '../../types/whiskey';

@Component({
  tag: 'whiskey-detail',
  styleUrl: 'whiskey-detail.scss',
  shadow: true
})
export class WhiskeyDetail {
  @Prop() match: MatchResults;
  @State() whiskeyName: string;
  @State() whiskey: Whiskey;

  componentWillLoad(){
    this.whiskeyName = this.match.params.whiskey;

    fetch('/assets/fixtures/whiskies.json')
      .then((response: Response) => response.json())
      .then( (whiskeys: Whiskey[]) => {
        whiskeys.map( (whiskey: Whiskey) => {
          // Needed because the title in the API has a typo
          whiskey.title = whiskey.title.replace('Spingbank', 'Springbank');

          if (whiskey.title.toLowerCase() === this.whiskeyName) {
            this.whiskey = whiskey;
            return;
          }
        });
      });
  }

  render() {
    return (
      <div class='container'>
        <p>Whiskey: {this.whiskeyName}</p>
        <p>Cost: ${this.whiskey.cost}</p>
        <button>Buy Now</button>
       
      </div>
    );
  }
}
