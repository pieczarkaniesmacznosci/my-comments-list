import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Comment } from '../shared/comment.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../shared/comment.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [],
})

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Output() newCommentEvent=new EventEmitter<Comment>();
  @Input() comment:Comment;

  constructor(private service : CommentService,
    private firestore:AngularFirestore ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData={
      id:null,
      name:'',
      message:'',
      isHidden:true
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
      this.firestore.collection('comments').add(data);
    else
      this.firestore.doc('comments/'+form.value.id).update(data)
      this.resetForm(form);
  }
}