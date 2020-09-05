
import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../services/post.service';
import {Subscription} from 'rxjs';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  lastUpdate = new Promise((resolve, reject) =>{
    const date = new Date();
    setTimeout(
      ()=>{
        resolve(date);
      }, 2000
    );
  });
  
  

  
  constructor( private postService: PostService) { }

  posts : Post[];
  postSubscription: Subscription;
 

  ngOnInit() {
    this.postSubscription= this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }


  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }

  onLovesIt(post: Post){
    this.postService.addLovesIt(post)
  }
  onDontLovesIt(post: Post){
    this.postService.removeLovesIt(post);
    }
    
 

  onDeletePost(post: Post){
    this.postService.removePost(post);
  }
}



