import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TelegramService {
  private readonly BOT_TOKEN = '8745137639:AAGm-rOgRhTMTRTjJMHLcfLAApmOrTQYB3Y';
  private readonly CHAT_ID = '-1003928994325';
  private readonly BASE_URL = `https://api.telegram.org/bot${this.BOT_TOKEN}`;

  constructor(private http: HttpClient) {}

  /** Build a beautifully formatted wedding wish message */
  private buildMessage(name: string, message: string): string {
    return (
      `🌸 ─────────────────── 🌸\n` +
      `        💍 <b>A Wedding Wish</b> 💍\n` +
      `🌸 ─────────────────── 🌸\n\n` +
      `👤 <b>From:</b>  <i>${this.escapeHtml(name)}</i>\n\n` +
      `❝ ${this.escapeHtml(message)} ❞\n\n` +
      `🕊️ ─────────────────── 🕊️\n` +
      `   🌹 <b>Dere &amp; Tinsu's Special Day</b> 🌹\n` +
      `🕊️ ─────────────────── 🕊️`
    );
  }

  /** Send a text-only wish */
  sendWish(name: string, message: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/sendMessage`, {
      chat_id: this.CHAT_ID,
      text: this.buildMessage(name, message),
      parse_mode: 'HTML',
    });
  }

  /** Send a wish with a photo using multipart/form-data */
  sendWishWithPhoto(name: string, message: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('chat_id', this.CHAT_ID);
    formData.append('photo', photo, photo.name);
    formData.append('caption', this.buildMessage(name, message));
    formData.append('parse_mode', 'HTML');

    return this.http.post(`${this.BASE_URL}/sendPhoto`, formData);
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
