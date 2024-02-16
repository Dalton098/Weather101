import { ElementRef } from '@angular/core';
import { CesiumDirective } from './cesium.directive';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';

/**
 * Create a mock element ref to use for testing
 */
export class MockElementRef extends ElementRef {}

describe('CesiumDirective', () => {
  var directive: unknown;

  beforeEach(() => {
    var fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CesiumDirective],
      providers: [provideHttpClient(), {provide: ElementRef, useClass: MockElementRef}]
    }).createComponent(AppComponent);
      
    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    directive = fixture.debugElement.queryAll(By.directive(CesiumDirective));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
