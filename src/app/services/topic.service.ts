import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BlogTopic } from "../models/blog-topic.model";

@Injectable({ providedIn: 'root' })
export class BlogTopicService {
  private apiUrl = 'http://localhost:8000/topics';

  constructor(private http: HttpClient) {}

 
  createBlogTopic(blogTopic: BlogTopic): Observable<BlogTopic> {
    return this.http.post<BlogTopic>(`${this.apiUrl}/`, blogTopic);
  }


  getBlogTopics(): Observable<BlogTopic[]> {
    return this.http.get<BlogTopic[]>(`${this.apiUrl}/`).pipe(
      catchError((error) => {
        console.error('Error fetching topics:', error);
        return throwError(() => error);
      })
    );
  }


  updateBlogTopic(blogTopic: BlogTopic): Observable<BlogTopic> {
    return this.http.put<BlogTopic>(`${this.apiUrl}/${blogTopic.id}`, blogTopic);
  }

  
  getBlogTopicDetails(blogTopicId: string): Observable<BlogTopic> {
    return this.http.get<BlogTopic>(`${this.apiUrl}/${blogTopicId}`);
  }


  deleteBlogTopic(blogTopicId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${blogTopicId}`);
  }
}
