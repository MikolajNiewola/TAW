import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
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
      }).subscribe({
        next: () => {
          this.title = '';
          this.text = '';
          this.image = '';
    
          form.resetForm();
          alert('Post został dodany!');
        }, error: (e) => {
          console.error(e);
          alert('Wystąpił błąd podczas dodawania posta.')
        }
      });

      
    } else {
      alert('Wypełnij wymagane pola!');
    }
  }
}