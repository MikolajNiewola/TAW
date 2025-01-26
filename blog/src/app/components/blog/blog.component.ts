import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { AuthService } from '../../services/auth.service';

@Component({
 selector: 'app-blog',
 standalone: true,
 imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe, AddPostComponent, GalleryComponent],
 providers: [DataService],
 templateUrl: './blog.component.html',
 styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  @Input() filterText: string = '';

  public items$: any;

  constructor(private service: DataService, public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(){   
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }

  refreshPosts() {
    this.getAll();
  }

  randomPost() {
    this.service.getAll().subscribe(response => {
      const ids = response.map((post: any) => post._id);
      if (ids.length > 0) {
        const randomId = ids[Math.floor(Math.random() * ids.length)];
        this.router.navigate(['/blog/detail/', randomId]);
      } else {
        console.error('brak postów');
      }
    }, error => {
      console.error("Błąd podczas pobierania: ", error);
    });
  }
}
