import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    OnInit,
    Output
  } from '@angular/core';
  import {} from 'rxjs';
  
  @Directive({
    selector: '[appIntersectionListener]',
    standalone: true
  })
  export class IntersectionListenerDirective implements AfterViewInit, OnInit {
  
    @Output() appIntersectionListener = new EventEmitter<boolean>();
    observer!: IntersectionObserver;//  It will be used to observe changes in the intersection of an element with its parent container.
  
    constructor(private element: ElementRef) {}
  
    ngOnInit(): void {
      this.intersectionObserver();
    }
  
    ngAfterViewInit(): void {
      this.observer.observe(this.element.nativeElement);
    }
  
    intersectionObserver() {
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8,
      };
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('scroll more');
          this.appIntersectionListener.emit(true);
        }
      }, options);
    }
  }