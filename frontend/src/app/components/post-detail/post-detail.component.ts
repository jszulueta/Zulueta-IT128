import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  initData(): void {
    this.http.get<Post>(`${API_CONFIG.baseUrl}/post/${this.id}`).subscribe({
      next: (data: Post) => {
        this.post = data;
        console.log(this.post);
      },
      error: (error) => {
        console.error('Error fetching post detail:', error);
      }
    })
  }
}