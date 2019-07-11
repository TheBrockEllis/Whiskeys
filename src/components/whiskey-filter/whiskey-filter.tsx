import { Component, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'whiskey-filter',
  styleUrl: 'whiskey-filter.scss',
  shadow: true
})
export class AppHome {
  @Event() whiskeysFiltered: EventEmitter;
  @State() currentRegion: string = 'all';
  @State() regions: string[] = [
    'all',
    'campbeltown',
    'highland',
    'islands',
    'islay',
    'lowlands',
    'speyside'
  ]

  filterWhiskeys(region: string) {
    this.currentRegion = region;
    this.whiskeysFiltered.emit(region);
  }

  render() {
    return (
      <ul class='whiskey-filter'>
        { this.regions.map( (region: string) => {
          return <li class={{ active: this.currentRegion === region ? true : false }} onClick={() => this.filterWhiskeys(region) }>{region}</li>;
          })
        }
      </ul>
    );
  }
}
