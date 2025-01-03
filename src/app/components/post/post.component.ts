import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { BlogPostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostDetailComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: BlogPost;
  @Output() postDeleted = new EventEmitter<string>();
  
  user = signal<User>({
    id: '',
    username: '',
    email: '',
    imageURL: '',
    posts: [],
    topics: [],
  });

  isEditing = signal<boolean>(false);

  constructor(private authService: AuthService, private blogPostService: BlogPostService){
    this.authService.user$.subscribe((user) => {
      console.log('User in PostComponent:', user);
      if(user) {
        this.user.set(user);
      } else {
        console.warn('User is null in PostComponent');
      }
    });
  }


  toggleEdit(){
    this.isEditing.set(!this.isEditing())
  }

  updatePost(updatedBlogPost: BlogPost) {
    const updatedPost = {
      ...updatedBlogPost,
      post: updatedBlogPost.post
    }
    this.blogPostService.updatePost(updatedBlogPost.id, updatedPost).subscribe({
      next: (response) => {
        console.log('Post updated successfully:', response);
        this.post = { ...this.post, ...response }; // Update the local post state
        this.toggleEdit(); // Exit edit mode
      },
      error: (error) => console.log(error)
    })
  }
  
  deletePost(postId: string) {
    this.blogPostService.deletePost(postId).subscribe({
      next: () => {
        console.log('Post deleted successfully');
        this.postDeleted.emit(postId); // Notify parent about deletion
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
}
