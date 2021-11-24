import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from 'src/app/Models/Comment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public url:string;
  constructor(
    private _http:HttpClient,
  ) {
    this.url=environment.url;
  }
  public addComment(comment:Comment, token:any, topicId:any):Observable<any>{
    var json = JSON.stringify(comment);
    var headers = new HttpHeaders().set("Content-Type","application/json")
                                    .set("Authorization",token);
    return this._http.post(this.url+'/comment/topic/'+topicId,json,{headers:headers});
  }
  public deleteComment(token:any, topicId:any, commentId:any):Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json")
                                    .set("Authorization",token);
    return this._http.delete(this.url+'/comment/'+topicId+'/'+commentId,{headers:headers});
  }
}
