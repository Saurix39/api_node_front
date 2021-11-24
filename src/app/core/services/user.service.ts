import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:string;
  public identity:any;
  public token:any;
  constructor(private _http:HttpClient) {
    this.url=environment.url;
  }
  register(user:User):Observable<any>{
    var json = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'/register',json,{headers:headers});
  }
  login(user:User, getToken:any):Observable<any>{
    var json = JSON.stringify(user);
    var jsonObj = JSON.parse(json);
    if(getToken==true){
      jsonObj.getToken=true;
    }
    json = JSON.stringify(jsonObj);
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'/login',json,{headers:headers});
  }
  getIdentity(){
    var identity = JSON.parse(localStorage.getItem('identity')+'');
    if(identity && identity != null && identity != undefined){
      this.identity=identity;
    }else{
      this.identity=null;
    }
    return this.identity;
  }
  getToken(){
    var token = localStorage.getItem('token');
    if(token && token != null && token != undefined){
      this.token=token;
    }else{
      this.token=null;
    }
    return this.token;
  }
  update(user:User, token:any):Observable<any>{
    var json = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.put(this.url+'/user/update',json,{headers:headers});
  }
  getUsers():Observable<any>{
    return this._http.get(this.url+'/users');
  }
  getUser(id:any):Observable<any>{
    return this._http.get(this.url+'/user/'+id);
  }
}
