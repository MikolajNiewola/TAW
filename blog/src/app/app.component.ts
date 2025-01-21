import { Component } from '@angular/core';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';

@Component({
  selector: 'app-root',
  imports: [BlogHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog';
}
