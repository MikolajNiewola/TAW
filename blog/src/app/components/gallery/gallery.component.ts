import { Component } from '@angular/core';
import { DataService, Post } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
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
    this.dataService.getAll().subscribe({
      next: (posts: Post[]) => {
        this.images = posts.map(post => post.image);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  enlargeImage(image: string) {
    this.enlargedImage = image;
  }

  closeImage() {
    this.enlargedImage = null;
  }
}