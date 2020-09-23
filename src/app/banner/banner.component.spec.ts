import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '../login/login.service';
import { BannerComponent } from './banner.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

describe('BannerComponent', () => {
    let bannerComponent: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let mockLoginService, mockRouterService;

    beforeEach(async () => {
        mockLoginService = jasmine.createSpyObj(['getAuthSubject']);

        await TestBed.configureTestingModule({
            declarations: [BannerComponent, AppComponent],
            providers: [
                { provide: LoginService, useValue: mockLoginService },
                { provide: Router, useValue: mockRouterService }
              ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        bannerComponent = fixture.componentInstance;
    })

    it('should be initialized', () => {
        expect(bannerComponent).toBeTruthy();
    });

    it('should be true', () => {
        expect('ChurnZero' in window).toBe(true);
    });
});
