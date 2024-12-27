import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images: string[] = [];
  enlargedImage: string | null = null;

  constructor(private dataService: DataService) {
    this.loadImages();
  }

  loadImages() {
    const posts = this.dataService.getAll();
    this.images = posts.map((post) => post.image);
  }

  enlargeImage(image: string) {
    this.enlargedImage = image;
  }

  closeImage() {
    this.enlargedImage = null;
  }
}
