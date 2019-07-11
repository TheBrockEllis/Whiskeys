import { Component, h, Prop } from '@stencil/core';
import { Whiskey } from '../../types/whiskey';

@Component({
  tag: 'whiskey-card',
  styleUrl: 'whiskey-card.scss',
  shadow: true
})
export class WhiskeyCard {
  @Prop() whiskey: Whiskey;

  componentWillLoad() {
    /* Needed because the API is returning jpgs, but the assets are pngs */
    this.whiskey.image = `${this.whiskey.image.split('.')[0]}.png`;
  }

  render() {
    return (
      <div class='whiskey-card'>
        <a href={this.whiskey.url}>
          <div class={`location-marker gradient-${this.whiskey.region}`}></div>
          <div class='whiskey-details'>
            <h2>{this.whiskey.title}</h2>
            <p>{this.whiskey.region} Region</p>
            <h3>${this.whiskey.cost}</h3>
          </div>
          <div class={`whiskey-notes gradient-${this.whiskey.region}`}>
            {
              this.whiskey.tasting_notes.map((note: string) => {
                return <span class='note'>{note}</span>;
              })
            }
          </div>
          <img src={`/assets/images/${this.whiskey.image}`} />
        </a>
      </div>
    );
  }
}
