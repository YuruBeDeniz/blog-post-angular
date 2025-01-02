import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogPostService {
  private apiUrl = 'http://localhost:8000/posts';

  constructor(private http: HttpClient) {}

  createPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/`, post);
  }

  getPostDetails(postId: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${postId}/`);
  }

  getPostsByAuthor(author: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/?author=${author}`);
  }

  getPostsByTopic(topicId: string): Observable<BlogPost[]> {
    console.log(`API call to fetch posts for topicId: ${topicId}`);
    return this.http.get<BlogPost[]>(`${this.apiUrl}/?topic=${topicId}`);
  }  
  
  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/`);
  }
}
