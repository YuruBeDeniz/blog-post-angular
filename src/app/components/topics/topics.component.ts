import { Component, OnInit, signal } from '@angular/core';
import { BlogPostService } from '../../services/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { TopicsSidebarComponent } from '../topics-sidebar/topics-sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [TopicsSidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  blogPosts = signal<BlogPost[]>([]);

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {}

  onTopicSelected(topicId: string): void {
    this.blogPostService.getPostsByTopic(topicId).subscribe({
      next: (posts) => this.blogPosts.set(posts),
      error: (err) => console.error('Error fetching posts:', err),
    });
  }
}
