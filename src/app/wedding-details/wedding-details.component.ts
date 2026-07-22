import { Component } from '@angular/core';

export interface WeddingEvent {
  time: string;
  title: string;
  description?: string;
  icon: string;
}

@Component({
  selector: 'app-wedding-details',
  standalone: true,
  imports: [],
  templateUrl: './wedding-details.component.html',
  styleUrl: './wedding-details.component.css'
})
export class WeddingDetailsComponent {
  events: WeddingEvent[] = [
    {
      time: '3:00',
      title: 'ሙሽራዉ ቤት',
      description: 'የሙሽራዉ ዝግጅት እና የፕሮግራሙ ጅማሮ',
      icon: '🤵'
    },
    {
      time: '3:20 - 3:50',
      title: 'ጉዞ ወደ ሙሽሪት ቤት',
      description: 'ሙሽራው በሚዜዎቹ እና በታዳሚዎች አጃቢነት በፍቅርና በደስታ አሸብርቆ ወደ ሙሽሪት ቤት የሚያደርገው ጉዞ።',
      icon: '🚗'
    },
    {
      time: '3:50 - 4:20',
      title: 'የፎቶ ፕሮግራም ሙሽሪት ቤት',
      description: 'ከቤተሰብ ጋር ፎቶ እና ምርቃት',
      icon: '📸'
    },
    {
      time: '4:25 - 4:50',
      title: 'ጉዞ ወደ ሰሜን ሙሉ ወንጌል ቤተክርስቲያን',
      description: 'ሙሽሮችና ታዳሚዎች ቅዱስ የቃልኪዳን ስነስርዓታቸውን ለመፈጸም በደስታና በዝማሬ ወደ ቤተክርስቲያን የሚያደርጉት ጉዞ።',
      icon: '💒'
    },
    {
      time: '4:50 - 7:15',
      title: 'የቃልኪዳን ስነስርዓት በቤተክርስቲያን',
      description: 'በእግዚአብሔር እና በቤተክርስቲያን ፊት የሚፈጸም ቅዱስ የጋብቻ ቃልኪዳን፣ የእግዚአብሔር ቃል ትምህርት እና የጋራ ህብረትና አምልኮ።',
      icon: '💍'
    },
    {
      time: '7:30 - 9:00',
      title: 'የምሳ ፕሮግራም (በገነት ሆቴል)',
      description: 'የተከበሩ እንግዶች፣ ቤተሰቦችና ወዳጆች በተዘጋጀው የምሳ ግብዣ ላይ በአንድነት የሚሰበሰቡበትና የሚደሰቱበት ሰዓት።',
      icon: '🍽️'
    },
    {
      time: '9:00 - 11:00',
      title: 'የኬክ ቆረሳ እና አምልኮ ፕሮግራም',
      description: 'የኬክ መቁረስ ስነስርዓት፣ የምስጋና አምልኮ እና ከተጋባዦች ጋር የሚደረግ አጠቃላይ የደስታ ጊዜ።',
      icon: '🎂'
    },
    {
      time: '11:00',
      title: 'ፕሮግራም ፍፃሜ',
      description: 'የዕለቱን የሰርግ ፕሮግራም በምስጋና እና በምርቃት በማጠናቀቅ ለእንግዶች እና ለሙሽሮች የሚደረግ የሽኘት ስነስርዓት።',
      icon: '✨'
    }
  ];
}
