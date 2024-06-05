import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMarqueeComponent } from './image-marquee.component';

describe('ImageMarqueeComponent', () => {
  let component: ImageMarqueeComponent;
  let fixture: ComponentFixture<ImageMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageMarqueeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
