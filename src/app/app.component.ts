import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { WeddingDetailsComponent } from './wedding-details/wedding-details.component';
import { RegistryComponent } from './registry/registry.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component'; // ✅ Import HeaderComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    OurStoryComponent,
    WeddingDetailsComponent,
    RegistryComponent,
    SubscribeComponent,
    AboutUsComponent,
    GalleryComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  showInvitationBox = true;
  isOpening = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void { 
  }

  openInvitation(): void {
    this.isOpening = true;
    setTimeout(() => {
      this.showInvitationBox = false;
    }, 700); // Wait for the 700ms scale/fade-out animation
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        document
          .getElementById(fragment)
          ?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
