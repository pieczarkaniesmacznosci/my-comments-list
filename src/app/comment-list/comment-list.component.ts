import { Component, OnInit, Output } from '@angular/core';
import { Comment } from '../shared/comment.model';
import { CommentService } from '../shared/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  list:Comment[];

  constructor(private service:CommentService) {}

  ngOnInit(){
    this.service.getComments().subscribe(actionArray =>{
      this.list=actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()} as Comment;
      })
    })
  }

  onEdit(comment:Comment){
    this.service.formData=Object.assign({},comment);
  }
}
