import { Component, OnInit } from '@angular/core';
import { DataService } from './component/list/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pruebaTecnica';
  public listaPersonal:any = []

  constructor(private DataService:DataService){

  }
  ngOnInit(): void {
    this.traerData();
  }

  public traerData(){
    this.DataService.get('https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf/user')
    .subscribe(respuesta => {
      this.listaPersonal = respuesta;
      console.log(this.listaPersonal)

    })
  }
}
