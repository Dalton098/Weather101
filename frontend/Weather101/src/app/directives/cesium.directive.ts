import { Directive, OnInit, ElementRef } from '@angular/core';
import { SceneMode, Viewer } from 'cesium';

/**
 * A {@link CesiumDirective} is a directive that will initialize a cesium globe and place it inside the provided html tag
 */
@Directive({
 selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  /**
   * Constructor
   * @param el The reference to the html element where the cesium element should be placed in
   */
 constructor(private el: ElementRef) { }

 /**
  * Initialize the viewer
  */
 ngOnInit() {
  const viewer = new Viewer(this.el.nativeElement, {
    sceneMode: SceneMode.SCENE2D
  });
 }

}