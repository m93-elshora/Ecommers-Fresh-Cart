import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
}
