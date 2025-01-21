import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-item-image',
  imports: [],
  templateUrl: './blog-item-image.component.html',
  styleUrl: './blog-item-image.component.css'
})
export class BlogItemImageComponent {
  @Input() image?: string;

}
