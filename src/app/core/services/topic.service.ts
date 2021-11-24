import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/Models/Topic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public url:String;
  constructor(private _http:HttpClient) {
    this.url=environment.url;
  }
  save(topic:Topic, token:any):Observable<any>{
    var json=JSON.stringify(topic);
    var headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.post(this.url+'/topic',json,{headers:headers});
  }

  getUserTopics(page:any, user_id:any):Observable<any>{
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/user-topics/'+user_id+'/'+page,{headers:headers});
  }

  getTopic(id:any):Observable<any>{
    return this._http.get(this.url+'/topic/'+id);
  }
  update(topic:Topic,token:any,id:any):Observable<any>{
    let json=JSON.stringify(topic);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.put(this.url+'/topic/'+id,json,{headers:headers});
  }
  delete(token:any,id:any):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
    return this._http.delete(this.url+'/topic/'+id,{headers:headers});
  }
  getTopics(page:any):Observable<any>{
    return this._http.get(this.url+'/topics/'+page);
  }

}
