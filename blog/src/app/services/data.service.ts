import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

export interface Post {
  title: string;
  text: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/api/posts');
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/api/post/' + id);
  }

  public addPost(post: { title: string; text: string; image: string }) {
    const body = {
      "title": post.title,
      "text": post.text,
      "image": post.image,
    };
  
    return this.http.post(this.url + '/api/post', body);
  }

}


