import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-button',
  templateUrl: './s-button.component.html',
  styleUrls: ['./s-button.component.scss'],
})
export class SButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let svgElement: any = document.querySelector('svg'); // Предполагая, что у вас есть только один SVG на странице
    var useElements = svgElement.querySelectorAll('.h100-8');
    var useElements2 = svgElement.querySelectorAll('.h100-6');

    var svgHeight = svgElement.clientHeight; // Получаем высоту SVG элемента
    var newHeight = svgHeight - 8; // Вычитаем 8px

    useElements.forEach(function (el: any) {
      el.setAttribute('height', newHeight + 'px'); // Задаем новую высоту для элементов <use>
    });
  }
}
