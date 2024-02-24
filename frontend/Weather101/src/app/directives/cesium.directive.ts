import { Directive, OnInit, ElementRef } from '@angular/core';
import { ImageryLayer, 
         ImageryProvider,
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
    sceneMode: SceneMode.SCENE2D
  });

  this.addAdditionalLayerOption(
    "United States Weather Radar",
    new WebMapServiceImageryProvider({
      url:
        "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?",
      layers: "nexrad-n0r",
      credit: "Radar data courtesy Iowa Environmental Mesonet",
      parameters: {
        transparent: "true",
        format: "image/png",
      },
    })
  );
 }

 /**
  * Utility function to add an additional imagery layer to the viewer
  * @param name The name of the imagery provider
  * @param imageryProviderPromise The {@link ImageryProvider}
  * @param alpha value controling the alpha of the layer
  * @param show 
  */
 private async addAdditionalLayerOption(name: string,
                                        imageryProviderPromise: ImageryProvider,
                                        alpha? : number,
                                        show?: boolean) {
    let imageryLayers = this.viewer.imageryLayers;
    try {
      const imageryProvider = await Promise.resolve(
        imageryProviderPromise
      );
      const layer = new ImageryLayer(imageryProvider);
      layer.alpha = defaultValue(alpha, 0.5);
      layer.show = defaultValue(show, true);
      imageryLayers.add(layer);
    } catch (error) {
      console.error(
        `There was an error while creating ${name}. ${error}`
      );
    }
  }
}
