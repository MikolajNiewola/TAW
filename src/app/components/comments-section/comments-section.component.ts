import { Component, Input } from '@angular/core';
import { CommentsServiceService } from '../../services/comments-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comments-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {
  @Input() postId!: string;
  comments: { author: string; text: string }[] = [];
  author = '';
  text = '';

  constructor(private commentsService: CommentsServiceService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.comments = this.commentsService.getComments(this.postId);
  }

  addComment() {
    if(this.author.trim() && this.text.trim()) {
      this.commentsService.addComment(this.postId, this.author, this.text);
      this.loadComments();
      this.author = '';
      this.text = '';
    }
  }
}
