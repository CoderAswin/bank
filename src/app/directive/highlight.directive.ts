import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { //elementRef is used to refer those elements
    console.log(el);
    el.nativeElement.style.backgroundColor = 'aqua' // style html attributes
    
  }



}
