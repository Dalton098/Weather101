import { ElementRef } from '@angular/core';
import { CesiumDirective } from './cesium.directive';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';

describe('CesiumDirective', () => {
  var directive: unknown;

  beforeEach(() => {
    var fixture = TestBed.configureTestingModule({
      // ...
      imports: [CesiumDirective, AppComponent],
      providers: [provideHttpClient()]
    }).createComponent(AppComponent);
      
    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    directive = fixture.debugElement.queryAll(By.directive(CesiumDirective));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
