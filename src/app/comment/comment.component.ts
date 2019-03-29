import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../shared/comment.model';
import { CommentService } from '../shared/comment.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
//import from parent component - CommentListComponent - the one containing data array
  @Input () comment:Comment;
  @Input () odd:boolean;
  @Input () index:number;
//sending info of element delete to the parent component
  @Output () commentDeleteEvent =new EventEmitter<number>();

  constructor(private service : CommentService,
    private firestore:AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={
      id:null,
      name:'',
      message:'',
      isHidden:true
    }
  }

//the way to be able to shout to parent component
  // deleteComment(index:any){
  //   this.commentDeleteEvent.emit(index);

  onDelete(commentId:string){
    if(confirm("Are you sure to delete this record?")){
      this.firestore.doc('comments/'+commentId).delete();
      console.log(commentId)
    }
  }
}