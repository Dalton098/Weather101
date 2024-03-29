import { Directive, OnInit, ElementRef } from '@angular/core';
import { Cartesian3, ImageryLayer, 
         ImageryProvider,
         IonImageryProvider,
         SceneMode,
         Viewer,
         WebMapServiceImageryProvider,
         defaultValue } from 'cesium';
import { interval } from 'rxjs';
import { WeatherService } from '../services/weather.service';

/**
 * A {@link CesiumDirective} is a directive that will initialize a cesium globe and place it inside the provided html tag
 */
@Directive({
 selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  /**
   * The {@link Viewer}
   */
  private viewer: Viewer;

  /**
   * Constructor
   * @param el The reference to the html element where the cesium element should be placed in
   */
 constructor(private el: ElementRef,
             private weatherService: WeatherService) { }

 /**
  * Initialize the viewer
  */
 ngOnInit() {
    this.viewer = new Viewer(this.el.nativeElement, {
      sceneMode: SceneMode.SCENE2D,
      baseLayerPicker: false,
      geocoder: false
    });

    const layer = new ImageryLayer(new WebMapServiceImageryProvider({
      url: "/mesonet/cgi-bin/wms/nexrad/n0r.cgi?",
      layers: "nexrad-n0r",
      credit: "Radar data courtesy Iowa Environmental Mesonet",
      parameters: {
        transparent: "true",
        format: "image/png",
      }
    }));

    const imageryLayer = ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(4), {});
    this.viewer.scene.imageryLayers.add(imageryLayer);

    this.viewer.imageryLayers.add(layer);
    this.zoomTo();
  }

  zoomTo() {
    const storedLoc = this.weatherService.getStoredLocation();
    this.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        storedLoc.longitude, storedLoc.latitude, 500000.0
      )
    })

    this.weatherService.zipCodeEventEmitter.subscribe((loc => {
      this.viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          loc.longitude, loc.latitude, 500000.0
        )
      })
    }))
  }

  get getViewer() { return this.viewer; }
}
