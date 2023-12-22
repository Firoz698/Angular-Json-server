import { Component, OnInit } from '@angular/core';
import { ApiManageService } from '../api-manage.service';
import { ColDef } from 'ag-grid-community';
import { User } from './User';

@Component({
  selector: 'app-practice-ag-json',
  templateUrl: './practice-ag-json.component.html',
  styleUrls: ['./practice-ag-json.component.css']
})
export class PracticeAgJsonComponent implements OnInit{

UserStore = new User();
IsActive:boolean=false;
rewData:any[]=[];
colDefs:ColDef[]=[
  {field:'id'},
  {field:'name'},
  {field:'email'},
  {field:'fatherName'},
  {field:'village'},
  {field:'city'},
  {field:'about'},
];

public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 150,
  filter: 'agTextColumnFilter',
  menuTabs: ['filterMenuTab'],
};
AddModal(){
  this.IsActive=false;
  this.UserStore.id=0;
  this.UserStore.name="";
  this.UserStore.email="";
  this.UserStore.fatherName="";
  this.UserStore.village="";
  this.UserStore.city="";
  this.UserStore.about="";
  document.getElementById('ModalId')?.click();
}


constructor(private httpServer:ApiManageService){}
  ngOnInit(): void {
    this.GetApiData();
  }
SaveChangeMethod(){
  this.httpServer.PostData(this.UserStore).subscribe(
    (res)=>{
      console.log(res)
      this.GetApiData();
    }
  )
  document.getElementById('CloseId')?.click();
}

RowDbClickMe(){
  document.getElementById('ModalId')?.click();
  this.IsActive=true;
}

EditMethod(){
  if(this.UserStore.id>0){
    document.getElementById('ModalId')?.click();
    this.IsActive=true;
  }
  else{
    alert("Plase Select Row")
  }
}
UpdateMethod(){
  this.httpServer.Update(this.UserStore).subscribe(
    (res)=>{
      this.GetApiData();
      this.IsActive=false;
    }
  )
  document.getElementById('CloseId')?.click();
}
RowClickMethod(event:any){
  this.UserStore.id=event.data.id;
  this.UserStore.name=event.data.name;
  this.UserStore.email=event.data.email;
  this.UserStore.fatherName=event.data.fatherName;
  this.UserStore.village=event.data.village;
  this.UserStore.city=event.data.city;
  this.UserStore.about=event.data.about;
}
DeletedMethod(){
  if(this.UserStore.id>0){
    this.httpServer.Deleted(this.UserStore).subscribe(
      (res)=>{
        this.GetApiData();
      }
    )
  }else{
    alert('Plase Select Row')
  }
}

GetApiData(){
  this.httpServer.GetData().subscribe(
    (res)=>{
      this.rewData=res;
    }
  )
}





}
