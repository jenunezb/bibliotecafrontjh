import { Component } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  esAdmin: boolean = false;

  constructor(private tokenService: TokenService){}

  ngOnInit(): void {
    if(this.tokenService.getRole()[0]=="a"){
      this.esAdmin=true;
    }
  }

}
