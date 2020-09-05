import {Post} from '../models/post.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
export class PostService {
    private posts: Post[] = [];

    postSubject = new Subject<Post[]>();

    emitPosts(){
        this.postSubject.next(this.posts.slice());
    }
    savePosts(){
        firebase.database().ref('/posts').set(this.posts);
    }

    getPosts(){
        firebase.database().ref('/posts').on('value', (data: firebase.database.DataSnapshot) => {
            this.posts = data.val() ? data.val() : [];
            this.emitPosts();
        })
    }
    constructor(){
        this.getPosts();
    }
    addPost(post: Post){
        this.posts.push(post);
        this.savePosts();
        this.emitPosts();
    }
    addLovesIt(post: Post){
        const postIndexToAddLovesIt = this.posts.findIndex(
            (postEl) => {
                if(postEl === post){
                    return true;
                }
            }
        );
        this.posts[postIndexToAddLovesIt].lovesIt = this.posts[postIndexToAddLovesIt].lovesIt + 1;
        this.savePosts();
        
    }
    removeLovesIt(post: Post){
        const postIndexToAddLovesIt = this.posts.findIndex(
            (postEl) => {
                if(postEl === post){
                    return true;
                }
            }
        );
        if(this.posts[postIndexToAddLovesIt].lovesIt>0)
        {
            this.posts[postIndexToAddLovesIt].lovesIt = this.posts[postIndexToAddLovesIt].lovesIt - 1;
        }
        else {
            this.posts[postIndexToAddLovesIt].lovesIt = 0;
        }
        this.savePosts();
    }
    removePost(post: Post){
        const postIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if(postEl === post){
                    return true;
                }
            }
        );
        this.posts.splice(postIndexToRemove -1);
        this.savePosts();
        this.emitPosts();
    }

}