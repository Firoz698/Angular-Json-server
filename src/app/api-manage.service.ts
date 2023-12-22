import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManageService {

  constructor(private http:HttpClient){}
  config ={
    headers: {
      "Content-Type":"application/json"
    }
  }


  GetData():Observable<any>{
    return this.http.get<any>("http://localhost:3000/EmployeeList",this.config);
  }
  PostData(PostObject:any):Observable<any>{
    debugger
    return this.http.post<any>("http://localhost:3000/EmployeeList",PostObject,this.config);
  }

  Update(Object:any):Observable<any>{
    return this.http.put("http://localhost:3000/EmployeeList/"+Object.id,Object,this.config);
  }
  Deleted(DeObject:any){
    return this.http.delete("http://localhost:3000/EmployeeList/"+DeObject.id,this.config);
  }












}
