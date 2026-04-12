import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleDarkMode() {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark.toString());
}

ngOnInit() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark');
  }
}

}