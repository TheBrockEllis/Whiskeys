import { Component, h, State, Element, Listen } from '@stencil/core';
import { Whiskey } from '../../types/whiskey';
import { Article } from '../../types/article';

@Component({
  tag: 'whiskey-home',
  styleUrl: 'whiskey-home.scss',
  shadow: true
})
export class WhiskeyHome {
  @Element() el: HTMLElement;
  @State() whiskeys: Whiskey[] = [];
  @State() displayWhiskeys: Whiskey[] = [];
  @State() articles: Article[] = [];

  @Listen('whiskeysFiltered')
  filterWhiskeys(event: CustomEvent) {
    if(event.detail === 'all') {
      this.displayWhiskeys = this.whiskeys;
      return;
    }
    
    this.displayWhiskeys = this.whiskeys.filter( (whiskey: Whiskey) => {
      return whiskey.region === event.detail;
    });
  }
  
  componentWillLoad() {
    let whiskiesPromise = fetch('/assets/fixtures/whiskies.json').then((response: Response) => response.json());
    let articlesPromise = fetch('/assets/fixtures/articles.json').then((response: Response) => response.json());

    Promise.all([whiskiesPromise, articlesPromise]).then( (values: any) => {
      this.whiskeys = values[0];
      this.articles = values[1];
      this.displayWhiskeys = this.whiskeys;
    });
  }

  render() {
    return (
      <div class='whiskey-home'>
        
        <whiskey-filter></whiskey-filter>

        <div class='container flex'>
          {
            this.displayWhiskeys.length === 0
            ? <p class='noWhiskeyError'>No whiskeys in that region</p>
            : ''
          }

          {this.displayWhiskeys.map((whiskey: Whiskey) => 
            <whiskey-card whiskey={whiskey}></whiskey-card>
          )}
        </div>

        <div class='container'>
          {this.articles.map((article: Article) =>
            <whiskey-article article={article}></whiskey-article>
          )}
        </div>

      </div>
    );
  }
}
