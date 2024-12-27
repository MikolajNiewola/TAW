import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {
  private comments: { [postId: string]: { author: string; text: string;} [] } = {};

  constructor() { }

  getComments(postId: string) {
    return this.comments[postId] || [];
  }

  addComment(postId: string, author: string, text: string) {
    if(!this.comments[postId]) {
      this.comments[postId] = [];
    }
    this.comments[postId].push({author, text});
  }
}
