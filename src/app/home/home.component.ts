import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  swiperConfig: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: 'fade', // Smooth fade transition
    speed: 1000, // Transition speed in milliseconds
  };

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  isPast: boolean = false;
  isToday: boolean = false;
  private timerId: any;

  // August 2026 calendar: each GC day mapped to its Ethiopian Geez numeral
  // Aug 1–6  = ሐምሌ 25–30 (፳፭–፴)
  // Aug 7–31 = ነሐሴ 1–25  (፩–፳፭)
  calendarDays: { gc: number; geez: string }[] = [
    { gc: 1,  geez: '፳፭' }, // ሐምሌ 25
    { gc: 2,  geez: '፳፮' }, // ሐምሌ 26 — wedding date
    { gc: 3,  geez: '፳፯' }, // ሐምሌ 27
    { gc: 4,  geez: '፳፰' }, // ሐምሌ 28
    { gc: 5,  geez: '፳፱' }, // ሐምሌ 29
    { gc: 6,  geez: '፴'  }, // ሐምሌ 30
    { gc: 7,  geez: '፩'  }, // ነሐሴ 1
    { gc: 8,  geez: '፪'  }, // ነሐሴ 2
    { gc: 9,  geez: '፫'  }, // ነሐሴ 3
    { gc: 10, geez: '፬'  }, // ነሐሴ 4
    { gc: 11, geez: '፭'  }, // ነሐሴ 5
    { gc: 12, geez: '፮'  }, // ነሐሴ 6
    { gc: 13, geez: '፯'  }, // ነሐሴ 7
    { gc: 14, geez: '፰'  }, // ነሐሴ 8
    { gc: 15, geez: '፱'  }, // ነሐሴ 9
    { gc: 16, geez: '፲'  }, // ነሐሴ 10
    { gc: 17, geez: '፲፩' }, // ነሐሴ 11
    { gc: 18, geez: '፲፪' }, // ነሐሴ 12
    { gc: 19, geez: '፲፫' }, // ነሐሴ 13
    { gc: 20, geez: '፲፬' }, // ነሐሴ 14
    { gc: 21, geez: '፲፭' }, // ነሐሴ 15
    { gc: 22, geez: '፲፮' }, // ነሐሴ 16
    { gc: 23, geez: '፲፯' }, // ነሐሴ 17
    { gc: 24, geez: '፲፰' }, // ነሐሴ 18
    { gc: 25, geez: '፲፱' }, // ነሐሴ 19
    { gc: 26, geez: '፳'  }, // ነሐሴ 20
    { gc: 27, geez: '፳፩' }, // ነሐሴ 21
    { gc: 28, geez: '፳፪' }, // ነሐሴ 22
    { gc: 29, geez: '፳፫' }, // ነሐሴ 23
    { gc: 30, geez: '፳፬' }, // ነሐሴ 24
    { gc: 31, geez: '፳፭' }, // ነሐሴ 25
  ];

  ngOnInit(): void {
    this.startCountdown();
    this.initSwiper();
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  startCountdown(): void {
    const weddingDate = new Date('August 2, 2026 15:00:00');
    const weddingDateTime = weddingDate.getTime();
    
    const updateCountdown = () => {
      const now = new Date();
      const nowTime = now.getTime();
      const difference = weddingDateTime - nowTime;

      // Check if it's the wedding day (same calendar day)
      const isSameDay = 
        now.getFullYear() === weddingDate.getFullYear() &&
        now.getMonth() === weddingDate.getMonth() &&
        now.getDate() === weddingDate.getDate();

      if (isSameDay) {
        this.isToday = true;
        this.isPast = false;
        if (this.timerId) {
          clearInterval(this.timerId);
        }
        return;
      }

      if (difference <= 0) {
        this.isPast = true;
        this.isToday = false;
        if (this.timerId) {
          clearInterval(this.timerId);
        }
        return;
      }

      this.isPast = false;
      this.isToday = false;
      this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    };

    updateCountdown();
    if (!this.isPast && !this.isToday) {
      this.timerId = setInterval(updateCountdown, 1000);
    }
  }

  initSwiper(): void {
    new Swiper('.swiper-container', this.swiperConfig);
  }
}