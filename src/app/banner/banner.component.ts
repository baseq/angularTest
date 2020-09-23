import { Component, ViewChild, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { IUser } from '../login/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy{
  pageTitle = 'Assets Management';
  currentUser: IUser;
  showUserMenu: boolean = false;
  churnConnectionStatus: boolean = false;
  authSubscription: Subscription;
  
  @ViewChild('userMenuElement') userMenuElement: ElementRef;

  constructor(private loginService: LoginService,
              private router: Router) {  }
              
  ngOnInit(): void {
    
    var originallog = console.table;
    console.table = (...args) => {
        if(args.length > 0 && args[0].IsConnected ) {
        this.churnConnectionStatus = args[0].IsConnected.value;
      }
        originallog.apply(console, args);
    }

    this.authSubscription = this.loginService.getAuthSubject().subscribe((value) => {
      this.currentUser = value;
    });
 
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login'], );
  }

  userMenuClickHandler(e) {
    this.showUserMenu = !this.showUserMenu;
    e.stopPropagation();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: ElementRef) {
    if (this.userMenuElement) {
      const clickedOutsideMenu = ! this.userMenuElement.nativeElement.contains(targetElement);
      if (clickedOutsideMenu) {
        this.showUserMenu = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
