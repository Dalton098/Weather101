import { DebugElement, ElementRef } from '@angular/core';
import { CesiumDirective } from './cesium.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { WebMapServiceImageryProvider } from 'cesium';

/**
 * Create a mock element ref to use for testing
 */
export class MockElementRef extends ElementRef {}

describe('CesiumDirective', () => {
  var directive: any;

  beforeEach(() => {
    var fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CesiumDirective],
      providers: [provideHttpClient(), {provide: ElementRef, useClass: MockElementRef}]
    }).createComponent(DashboardComponent);
      
    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    directive = fixture.debugElement.queryAll(By.directive(CesiumDirective));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    
  });

  it('should create the weather layer', () => {
    const cesDirective = directive[0].injector.get(CesiumDirective) as CesiumDirective;
    const viewer = cesDirective.getViewer;
    const imageryLayers = viewer.imageryLayers;
    expect(imageryLayers.length).toBe(3);
    const weatherLayer = imageryLayers.get(2);
    const provider = weatherLayer.imageryProvider as WebMapServiceImageryProvider;
    expect(provider.url).toBe("/mesonet/cgi-bin/wms/nexrad/n0r.cgi");
  });
});
