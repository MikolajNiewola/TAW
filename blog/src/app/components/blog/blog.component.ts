import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';

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

  constructor(private service: DataService) {
  }
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
}
