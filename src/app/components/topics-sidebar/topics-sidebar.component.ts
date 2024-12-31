import { Component, EventEmitter, Output, OnInit, signal } from '@angular/core';
import { BlogTopicService } from '../../services/topic.service';
import { BlogTopic } from '../../models/blog-topic.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topics-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics-sidebar.component.html',
  styleUrl: './topics-sidebar.component.css'
})
export class TopicsSidebarComponent {
  blogTopics = signal<BlogTopic[]>([]);

  @Output() topicSelected = new EventEmitter<string>();

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

  selectTopic(topicId: string): void {
    this.topicSelected.emit(topicId);
  }

}
