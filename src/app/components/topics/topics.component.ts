import { Component, OnInit, signal } from '@angular/core';
import { TopicsSidebarComponent } from '../topics-sidebar/topics-sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [TopicsSidebarComponent, PostsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  selectedTopicId: string | null = null;
  selectedTopicTitle: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  onTopicSelected(topic: { id: string; title: string }): void {
    this.selectedTopicId = topic.id;
    this.selectedTopicTitle = topic.title;
  }
}

/* This components is like a bridge between two unrelated components.
It gets the selectedTopicId from topics-sidebar-component and 
passes it down to posts-component. 
*/