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
    group_names: []
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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  canEdit(post: BlogPost): boolean {
    return this.authService.canEditPosts(post);
  }

  toggleEdit(){
    this.isEditing.set(!this.isEditing())
  }

  updatePost(updatedBlogPost: BlogPost) {
    const updatedPost = {
      ...updatedBlogPost,
      post: updatedBlogPost.post
    }
    console.log(updatedPost.author.id);
    this.blogPostService.updatePost(updatedBlogPost.id, updatedPost).subscribe({
      next: (response) => {
        this.post = {  ...response, ...this.post }; 
        this.toggleEdit();
      },
      error: (error) => console.log(error)
    })
  }
  
  deletePost(postId: string) {
    this.blogPostService.deletePost(postId).subscribe({
      next: () => {
        console.log('Post deleted successfully');
        this.postDeleted.emit(postId); 
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
}


