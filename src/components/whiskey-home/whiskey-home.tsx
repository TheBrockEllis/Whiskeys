import { Component, h, State } from '@stencil/core';
import { Whiskey } from '../../types/whiskey';
import { Article } from '../../types/article';

@Component({
  tag: 'whiskey-home',
  styleUrl: 'whiskey-home.scss',
  shadow: true
})
export class AppHome {
  @State() whiskeys: Whiskey[] = [];
  @State() articles: Article[] = [];

  componentWillLoad() {
    let whiskiesPromise = fetch('assets/fixtures/whiskies.json').then((response: Response) => response.json());
    let articlesPromise = fetch('assets/fixtures/articles.json').then((response: Response) => response.json());

    Promise.all([whiskiesPromise, articlesPromise]).then( (values: any) => {
      this.whiskeys = values[0];
      this.articles = values[1];
    });
  }

  render() {
    return (
      <div class='whiskey-home'>
        
        <ul class='whiskey-filter'>
          <li class='active'>All</li>
          <li>Highland</li>
          <li>Lowland</li>
          <li>Islands</li>
          <li>Isley</li>
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
