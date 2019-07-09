import { Component, h, State } from '@stencil/core';
import { Whiskey } from '../../types/whiskey';

@Component({
  tag: 'whiskey-home',
  styleUrl: 'whiskey-home.scss',
  shadow: true
})
export class AppHome {
  @State() whiskeys: Whiskey[] = [];

  componentWillLoad() {
    fetch('assets/fixtures/whiskies.json')
      .then((response: Response) => response.json())
      .then(response => {
        this.whiskeys = response;
    });
  }

  render() {
    return (
      <div class='whiskey-home'>
        
        <ul>
          <li>Place</li>
          <li>Place</li>
          <li>Place</li>
          <li>Place</li>
        </ul>

        <div class='container'>
          {this.whiskeys.map((whiskey: Whiskey) =>
            <whiskey-card whiskey={whiskey}></whiskey-card>
          )}
        </div>
       
      </div>
    );
  }
}
