import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn:'root'
})
export class CommentService {

  commentRecord :Comment;
  formData:Comment;

  constructor(private firestore:AngularFirestore){ }

  getComments(){
    return  this.firestore.collection('comments').snapshotChanges();
  }
}