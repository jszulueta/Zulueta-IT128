import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit {
  posts?: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>(`${API_CONFIG.baseUrl}/post`)
      .subscribe({
        next: (data: Post[]) => {
          this.posts = data;
          console.log(this.posts);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
  }
}