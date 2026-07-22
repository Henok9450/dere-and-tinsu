import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css',
})
export class RegistryComponent {
  guestName: string = '';
  guestMessage: string = '';
  photoPreview: string | null = null;
  selectedPhoto: File | null = null;

  /** 'idle' | 'sending' | 'success' | 'error' */
  submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  messages: { name: string; src: string; text: string; color: string }[] = [
    {
      name: 'ጌታባለው.',
      src: 'assets/images/thanks/a.jpg',
      text: 'ጌት ስለአንተ ስናስብ ስለማረፊያችን ነው የምናስበው። እግዚአብሔር በአንተ በብዙ መንገድ አሳርፎናል። ገና ከጅምሩ አንዳንድ ነገር እንዴት ሊሆን ነው ብለን መጨነቅ ሳንጀምር አንተ ጋር መፍትሄው አለ።በጥቂት ቃላት ግለጹት ብንባል \" ሰው እንዴት ጓደኛም ቤተሰብም አለቃም መሆን ይችላል?\" ነው ማለት የምንችለው። ስለአንተ ቸሩ ይመስገን',
      color: '#FFD3B5',
    },
    {
      name: 'በርይሁን እና ማስተዋል.',
      src: 'assets/images/thanks/b.jpg',
      text: 'እንደምታውቁት ነው አንድ ዘመድ ጥሩ ብንባል እናንተ ናችሁ ያላችሁን። በስጋ በምንም ሳንዛመድ እንዴት ነው እሱ እንዲህ የተዋሃድነው? በርዬ ደርባባ ወንድም ጋሼ ነህ ማስቲዬ በዚህም ዘመን ንጹህ እና ቅን ሰው አለ ታስብዪናለሽ። ከቤታችሁ ጓዳ ከልባችሁ ፍቅር ምን ጎደለብን እግዚአብሔር መልካሙን ሁሉ ይሙላባችሁ',
      color: '#FFAAA6',
    },
    {
      name: 'ታሜ እና መሲ',
      src: 'assets/images/thanks/c.jpg',
      text: 'እኛን ወዳጅ ስለማድረግ ወረድ አላችሁልን ለእኛ ጊዜ ኖራችሁ ልብ ኖራችሁ በሃሳባቹ ስፍራ ሰጣችሁን ስለዚህ በምድር ሊገለጽ ከሚችለው ምን ነሳችሁን? ምንም! መሲዬ ሁሌ እንደምንልሽ ከጅማሬው እስከ ፍጻሜ ወገባቹን ታጥቃችሁ ዳራችሁን። በእውነት ስለፍቅራችሁ እና ቅንነታችሁ ቃል የለንም። በቃ እንወዳቿለን።',
      color: '#D5AAFF',
    },
    {
      name: 'ኤርሚ እና ሕሉ',
      src: 'assets/images/thanks/d.jpg',
      text: 'በእውነት በትክክል ልከኛ የሆነውን ነገር አስተማራችሁን። ታዲያ ከቃሉ ብቻ አይደለም ከሕይወትም። ያለስስት በልግስና ካላችሁ ሁሉ ምክር አንድም አልቀረ መግባችሁናል። እንደ ህጻን ልጅ እጃችንን ይዛችሁ የመምራት ያህል መራችሁን። መንገዳችንን አቀለላችሁልን። በእውነት እንወዳቿለን።',
      color: '#A2D5F2',
    },
    {
      name: 'ሚዙ እና ማኔ',
      src: 'assets/images/thanks/e.jpg',
      text: 'እናንተን ያስተዋወቀችን ቤተክርስቲያን  ደግሞም የሰጠንን እግዚአብሔርን እናመሰግናለን።ከረጅሙ የሕይወት ጉዞ የትዳር መንገዳችሁ ልምዳችሁን ሁሉ ሰጣችሁን መከራችሁን በቤታችሁ አስተናገዳችሁን ደግሞም በየጊዜው ተከታተላችሁን። እናመሰግናቿለን።',
      color: '#F5D76E',
    },
    {
      name: 'አማኑ እና ሰርክ',
      src: 'assets/images/thanks/f.jpg',
      text: 'ሰው በጌታ ኢየሱስ ስላመነ ብቻ ቤተሰብ የምታደርጉ ጓዳችሁን ከፍታቹ ስታስገቡን የገባን ነገር ቀድሞ ልባችሁ እንደተከፈተልን ነው። እግዚአብሔር የምትሹትን ሁሉ የምታገኙበትን ደጁን ወለል አድርጎ ይክፈትላችሁ እንጂ ምን ይባላል',
      color: '#FF9AA2',
    },
    {
      name: 'ዳጊ እና ናቲ',
      src: 'assets/images/thanks/image.jpg',
      text: 'ጓደኝነታችን ቤተሰባዊነታችን በምን ይለካ ይሆን? አምላካዊ በሆነ ፍቅር በመካከላችን በሚሰራ ሕይወቱ ተሳስረን እንጂ ይህን ያህል ሊኮንልን የሚገባን አድርገን አንወስድም ራሳችንን እንደሚገባን አንቆጥርም።ከግንኙነታችን ሁሉ የምንወደው ነገር ምንም ነገር እንደውለታ የማንቆጣጠረው ነገር ነው።ባስፈለገን ነገር ሁሉ ባስፈለገን ጊዜ ሁሉ ራሳችንን ያለ ልክ እየሰጠን በመተሳሰብ የኖርንባቸውን አመታት አምላክ ይባርክልን።',
      color: '#FFB7B2',
    },
    {
      name: 'ቲጂዬ',
      src: 'assets/images/thanks/tg.jpg',
      text: 'ቅድም አግኝተንሽ ግን ለአመታት የዘለቀ ወዳጅነት እንዳለን እንዲሰማን ያደረግሽበት ጥበብ ደግሞም ለሕይወት ዘመን የሚሆነን ስንቅ ለማሰነቅ ስትደክሚ ለሚያይሽ ሰው ከዛ ሁሉ ሃላፊነት አጣበሽ የመጣሽ ከዛ ሁሉ የሕይወት ልምድ ለኛ ለትንንሾቹ ለማካፈል የወረድሽ አትመስዪም። ደግሞ በእኛ ፊት ስለ ሁሉ ግልጽ ሆነሽልን አስተዋይ አደረግሽን። ከመጣነው መንገድ ይልቅ የምንሄደውን ስናየው እንዴት እንደሚያጓጓን በቃ እንወድሻለን',
      color: '#FFDAC1',
    },
  ];

  constructor(private telegram: TelegramService) {}

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedPhoto = file;

    // Generate a local preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoPreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  addMessage(event: Event): void {
    event.preventDefault();
    if (!this.guestName.trim() || !this.guestMessage.trim()) return;

    this.submitState = 'sending';

    const send$ = this.selectedPhoto
      ? this.telegram.sendWishWithPhoto(
          this.guestName.trim(),
          this.guestMessage.trim(),
          this.selectedPhoto
        )
      : this.telegram.sendWish(this.guestName.trim(), this.guestMessage.trim());

    send$.subscribe({
      next: () => {
        this.submitState = 'success';
        this.guestName = '';
        this.guestMessage = '';
        this.photoPreview = null;
        this.selectedPhoto = null;
        setTimeout(() => (this.submitState = 'idle'), 4000);
      },
      error: () => {
        this.submitState = 'error';
        setTimeout(() => (this.submitState = 'idle'), 4000);
      },
    });
  }
}
