import { Component, AfterViewInit } from '@angular/core';
import Glide from '@glidejs/glide';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements AfterViewInit {
  groomImages = [
    'assets/images/PHDE0475.JPG',
    'assets/images/PHDE9313.JPG',
    'assets/images/PHDE0146.JPG',
    'assets/images/PHDE9316.JPG',
    'assets/images/PHDE9806.JPG'
  ];

  brideImages = [
    'assets/images/PHDE0463.JPG', 
    'assets/images/PHDE0594.JPG',
    'assets/images/PHDE0343.JPG',
    'assets/images/PHDE0289.JPG',
  ];

  ngAfterViewInit(): void {
    // Initialize Groom Slider
    new Glide('.groom-slider', {
      type: 'slider',
      autoplay: 3000,
      hoverpause: true,
      perView: 1,
      gap: 10,
      animationDuration: 1000,
    }).mount();

    // Initialize Bride Slider
    new Glide('.bride-slider', {
      type: 'carousel',
      autoplay: 3000,
      hoverpause: true,
      perView: 2,
      gap: 0,      
      animationDuration: 1000,
    }).mount();
  }
}