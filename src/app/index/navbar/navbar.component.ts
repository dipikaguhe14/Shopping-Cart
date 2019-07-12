import { Component, OnInit,VERSION } from '@angular/core';
import{Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  angualrversion=VERSION;
  constructor(public authService:AuthService,
              public router:Router,
              public productService:ProductService,
              public translate:TranslateService,
              public theme:ThemeService) { }

  ngOnInit() {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);

  }
  setLang(lang:string){
this.translate.use(lang).then(()=>{});
  }
  updateTheme(theme:string){
    this.theme.updateThemeUrl(theme);
  }
}
