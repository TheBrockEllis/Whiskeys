import { Component, h, Prop } from '@stencil/core';
import { Article } from '../../types/article';

@Component({
  tag: 'whiskey-article',
  styleUrl: 'whiskey-article.scss',
  shadow: true
})
export class WhiskeyArticle {
  @Prop() article: Article;

  render() {
    return (
      <article>
        <a href={this.article.url}>
          <div class='background-image' style={{ backgroundImage: "url(/assets/images/" + this.article.img + ")" }}></div>
          <div class='content'>
            <h2>{this.article.title}</h2>
            <p>{this.article.teaser}</p>
          </div>
        </a>
      </article>
    );
  }
}
