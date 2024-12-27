import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  title: string = '';
  text: string = '';
  image: string = '';

  constructor(private dataService: DataService) {}

  addPost(form: any) {
    if(this.title.trim() && this.text.trim()) {
      this.dataService.addPost({
        title: this.title,
        text: this.text,
        image: this.image || 'https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg',
        id: this.generateId(),
      });

      this.title = '';
      this.text = '';
      this.image = '';

      form.resetForm();
      alert('Post został dodany!');
    } else {
      alert('Wypełnij wymagane pola!');
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
