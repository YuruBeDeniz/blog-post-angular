import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogPostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  @Input() topicId: string | null = null;
  @Input() topicTitle: string | null = null;
  posts: BlogPost[] = [];
  postForm: FormGroup;

  user = signal<User>({
    id: '',
    username: '',
    email: '',
    imageURL: '',
    posts: [],
    topics: [],
    group_names: []
  });

  constructor(
    private blogPostService: BlogPostService, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.postForm = this.formBuilder.group({
      post: ['']
    });

    this.authService.user$.subscribe((user) => {
      if(user) {
        this.user.set(user);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topicId'] && this.topicId) {
      console.log(`topicId changed to: ${this.topicId}`);
      this.getPosts();
    }
  }

  getPosts(): void {
    if (this.topicId) {
      this.blogPostService.getPostsByTopic(this.topicId).subscribe({
        next: (posts) => {
          //console.log(`Posts received for topicId ${this.topicId}:`, posts);
          //console.log("user:", this.user())
          this.posts = posts;
        },
        error: (err) => console.error('Error fetching posts:', err),
      });
    }
  }

  createPost(): void {
    if (this.topicId && this.postForm.valid) {
      const newPost: BlogPost = {
        post: this.postForm.value.post,
        topic: this.topicId,
        author: this.user(),
      };

      this.blogPostService.createPost(newPost).subscribe({
        next: (createdPost) => {
          //console.log(this.topicId);
          //console.log(createdPost);
          this.posts.push(createdPost);
          this.postForm.reset();
        },
        error: (err) => console.error('Error creating post:', err),
      });
    }
  }
  onPostDeleted(postId: string) {
    console.log('Removing post with ID:', postId);
    this.posts = this.posts.filter(post => post.id !== postId);
  }
  
}
