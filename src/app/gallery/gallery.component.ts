import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  activeImage: string | null = null;
  activeIdx: number = -1;

  images: string[] = [
    'assets/images/PHDE9008.JPG',
    'assets/images/PHDE9014.JPG',
    'assets/images/PHDE9036.JPG',
    'assets/images/PHDE9146.JPG',
    'assets/images/PHDE9172.JPG',
    'assets/images/PHDE9174.JPG',
    'assets/images/PHDE9217.JPG',
    'assets/images/PHDE9225.JPG',
    'assets/images/PHDE9227.JPG',
    'assets/images/PHDE9236.JPG',
    'assets/images/PHDE9350.JPG',
    'assets/images/PHDE9452.JPG',
    'assets/images/PHDE9456.JPG',
    'assets/images/PHDE9484.JPG',
    'assets/images/PHDE9568.JPG',
    'assets/images/PHDE9602.JPG',
    'assets/images/PHDE9705.JPG',
    'assets/images/PHDE9754.JPG',
    'assets/images/PHDE9791.JPG',
    'assets/images/PHDE9818.JPG',
    'assets/images/PHDE9856.JPG',
    'assets/images/PHDE9873.JPG',
    'assets/images/PHDE9940.JPG',
    'assets/images/01.png',
    'assets/images/PHDE0074.JPG',
    'assets/images/PHDE0134.JPG',
    'assets/images/PHDE0216.JPG',
    'assets/images/PHDE0243.JPG',
    'assets/images/PHDE0260.JPG',
    'assets/images/PHDE0285.JPG',
    'assets/images/PHDE0287.JPG',
    'assets/images/PHDE0485.JPG',
    'assets/images/PHDE0508.JPG',
    'assets/images/PHDE0530.JPG',
    'assets/images/PHDE0545.JPG',
    'assets/images/PHDE0610.JPG',
    'assets/images/PHDE0625.JPG',
    'assets/images/PHDE0645.JPG',
    'assets/images/PHDE0660.JPG',
    'assets/images/PHDE0699.JPG',
    'assets/images/PHDE8958.JPG',
    'assets/images/PHDE8960.JPG'
  ];


  ngOnInit(): void {
    // Images are configured with correct file extensions
  }

  openLightbox(image: string, index: number): void {
    this.activeImage = image;
    this.activeIdx = index;
  }

  closeLightbox(): void {
    this.activeImage = null;
    this.activeIdx = -1;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.activeIdx < this.images.length - 1) {
      this.activeIdx++;
      this.activeImage = this.images[this.activeIdx];
    } else {
      this.activeIdx = 0;
      this.activeImage = this.images[0];
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.activeIdx > 0) {
      this.activeIdx--;
      this.activeImage = this.images[this.activeIdx];
    } else {
      this.activeIdx = this.images.length - 1;
      this.activeImage = this.images[this.activeIdx];
    }
  }
}
