import { Component, signal, OnInit } from '@angular/core';
import { BlogTopicService } from '../../services/topic.service';
import { BlogTopic } from '../../models/blog-topic.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  blogTopics = signal<BlogTopic[]>([]);

  constructor(private blogTopicService: BlogTopicService) {}

  ngOnInit(): void {
    this.getBlogTopics();
  }

  getBlogTopics(): void {
    this.blogTopicService.getBlogTopics().subscribe({
      next: (topics) => this.blogTopics.set(topics),
      error: (err) => console.error('Error fetching topics:', err),
    });
  }
}
