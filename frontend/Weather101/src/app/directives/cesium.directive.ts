import { Directive, OnInit, ElementRef } from '@angular/core';
import { ImageryLayer, 
         ImageryProvider,
         IonImageryProvider,
         SceneMode,
         Viewer,
         WebMapServiceImageryProvider,
         defaultValue } from 'cesium';
import { interval } from 'rxjs';

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
 constructor(private el: ElementRef) { }

 /**
  * Initialize the viewer
  */
 ngOnInit() {
    this.viewer = new Viewer(this.el.nativeElement, {
      sceneMode: SceneMode.SCENE2D,
      baseLayerPicker: false,
      sceneModePicker: false,
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
  }

  get getViewer() { return this.viewer; }
}
