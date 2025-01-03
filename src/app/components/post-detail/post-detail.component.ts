import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input() post!: BlogPost;
  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<BlogPost>();
  @Output() delete = new EventEmitter<string>();

  editedPost: BlogPost;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && changes['post'].currentValue) {
      this.editedPost = { ...this.post }; // Clone the input post
    }
  }

  constructor() {
    this.editedPost = { ...this.post };
  }

  onUpdate() {
    this.update.emit(this.editedPost);
  }

  onDelete() {
    this.delete.emit(this.post.id);
  }

  onCancel() {
    this.cancel.emit();
  }
}
