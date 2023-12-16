import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  width!: number;
  height = 48;
  pathShadow!: string;
  pathBackgroud!: string;
  offsetAngles = 26.1421;

  widthBg!: number;
  heightBg!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    const hostWidth = this.elRef.nativeElement.offsetWidth;
    // console.log(hostWidth);
    this.width = hostWidth;
    // this.width = 172;

    this.calcShadow();
    this.calcBackground();
  }

  calcShadow(): void {
    const o = this.width - this.offsetAngles * 2;
    const w = o + this.offsetAngles;
    const ct1 = w + 2.652;
    const ct2 = w + 5.196;
    const ct3 = w + 7.071;
    const lrt = this.width - 1.536;
    const cr1 = lrt + 1.953;
    const cr2 = lrt + 1.953;
    const cr3 = lrt;
    const lrb = cr3 - 17.535;
    const cb1 = lrb - 1.875;
    const cb2 = lrb - 4.419;
    const cb3 = lrb - 7.071;

    this.pathShadow = `M19.0711 2.92893C20.9464 1.05357 23.49 0 26.1421 0H${w}C${ct1} 0 ${ct2} 1.05357 ${ct3} 2.92893L${lrt} 20.4645C${cr1} 22.4171 ${cr2} 25.5829 ${cr3} 27.5355L${lrb} 45.0711C${cb1} 46.9464 ${cb2} 48 ${cb3} 48H26.1421C23.49 48 20.9464 46.9464 19.0711 45.0711L1.53553 27.5355C-0.417086 25.5829 -0.417087 22.4171 1.53553 20.4645L19.0711 2.92893Z`;
  }

  calcBackground(): void {
    const xOffsetAngles = 22.0523;
    // this.widthBg = (this.width * 93.0232558) / 100;
    this.widthBg = this.width - 6 * 2;
    // this.heightBg = (this.height * 87.5) / 100;
    this.heightBg = this.height - 4 * 2;

    // const xOffsetBg = (this.width - this.widthBg) / 2;
    const xOffsetBg = 6;
    // alert(xOffsetBg);
    // const yOffsetBg = (this.height - this.heightBg) / 2 + 1;
    const yOffsetBg = 4;

    const o = this.widthBg - xOffsetAngles * 2;
    const w = o + xOffsetAngles;
    const ct1X = w + 2.661 + xOffsetBg;
    const ct2X = w + 5.212 + xOffsetBg;
    const ct3X = w + 7.089 + xOffsetBg;
    const ltX = ct3X + 13.455;
    const cr1X = ltX + 1.941;
    const cr2X = ltX + 1.941;
    const cr3X = ltX + 0;
    const lbX = cr3X - 13.455;
    const cb1X = lbX - 1.877;
    const cb2X = lbX - 4.428;
    const cb3X = lbX - 7.089;

    const hb = this.widthBg / 2 + 2.4142;

    const cbr1X = hb - 0.2652;
    const cbr2X = hb - 0.5196;
    const cbr3X = hb - 0.7071;

    const lbrX = cbr3X - 1;

    const cbb1X = lbrX - 0.3905;
    const cbb2X = lbrX - 1.0237;
    const cbb3X = lbrX - 1.4142;

    const lblX = cbb3X - 1;

    const cbl1X = lblX - 0.1875;
    const cbl2X = lblX - 0.4419;
    const cbl3X = lblX - 0.7071;

    this.pathBackgroud = `
      M${14.9626 + xOffsetBg} ${2.94761 + yOffsetBg}
      C
      ${16.8395 + xOffsetBg} ${1.06082 + yOffsetBg} 
      ${19.391 + xOffsetBg} ${0 + yOffsetBg} 
      ${22.0523 + xOffsetBg} ${0 + yOffsetBg}
      H${w}
      C
      ${ct1X} ${0 + yOffsetBg} 
      ${ct2X} ${1.06082 + yOffsetBg} 
      ${ct3X} ${2.94761 + yOffsetBg}
      L${ltX} ${16.4738 + yOffsetBg}
      C
      ${cr1X} ${18.4243 + yOffsetBg} 
      ${cr2X} ${21.5757 + yOffsetBg} 
      ${cr3X} ${23.5262 + yOffsetBg}
      L${lbX} ${37.0524 + yOffsetBg}
      C
      ${cb1X} ${38.9392 + yOffsetBg} 
      ${cb2X} ${40 + yOffsetBg} 
      ${cb3X} ${40 + yOffsetBg}
      H${hb}
      C
      ${cbr1X} ${40 + yOffsetBg} 
      ${cbr2X} ${40.1054 + yOffsetBg} 
      ${cbr3X} ${40.2929 + yOffsetBg}
      L${lbrX} ${41.2929 + yOffsetBg}
      C
      ${cbb1X} ${41.6834 + yOffsetBg} 
      ${cbb2X} ${41.6834 + yOffsetBg} 
      ${cbb3X} ${41.2929 + yOffsetBg}
      L${lblX} ${40.2929 + yOffsetBg}
      C
      ${cbl1X} ${40.1054 + yOffsetBg} 
      ${cbl2X} ${40 + yOffsetBg} 
      ${cbl3X} ${40 + yOffsetBg}
      H${22.0523 + xOffsetBg}
      C
      ${19.391 + xOffsetBg} ${40 + yOffsetBg} 
      ${16.8395 + xOffsetBg} ${38.9392 + yOffsetBg} 
      ${14.9626 + xOffsetBg} ${37.0524 + yOffsetBg}
      L${1.50763 + xOffsetBg} ${23.5262 + yOffsetBg}
      C
      ${-0.432568 + xOffsetBg} ${21.5757 + yOffsetBg} 
      ${-0.432566 + xOffsetBg} ${18.4243 + yOffsetBg} 
      ${1.50763 + xOffsetBg} ${16.4738 + yOffsetBg}
      L${14.9626 + xOffsetBg} ${2.94761 + yOffsetBg}Z`;
  }
}
