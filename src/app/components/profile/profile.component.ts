import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogTopicService } from '../../services/topic.service';
import { BlogTopic } from '../../models/blog-topic.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = signal<User>({
    id: '',
    username: '',
    email: '',
    imageURL: '',
    posts: [],
    topics: [],
  });
  topicForm!: FormGroup;
  errorMessage = signal<string>('');

constructor(
  private authService: AuthService,
  private blogTopicService: BlogTopicService,
  private formBuilder: FormBuilder
){
  this.authService.user$.subscribe((user) => {
    if(user) {
      this.user.set(user);
    }
  });
};

ngOnInit(): void {
  this.topicForm = this.formBuilder.group({
    title: [''],
  });
}

createTopic(): void {
  const newBlogTopic = {
    title: this.topicForm.get('title')?.value,
    author: this.user().username,
    posts: [],
  };

  this.blogTopicService.createBlogTopic(newBlogTopic).subscribe({
    next: () => this.topicForm.reset(),
    error: (err) => this.errorMessage.set(err.message),
  });
}
}
