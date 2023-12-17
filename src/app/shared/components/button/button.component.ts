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
  pathBorder!: string;
  offsetAngles = 26.1421;

  widthBg!: number;
  heightBg!: number;

  widthBorder!: number;
  heightBorder!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    const hostWidth = this.elRef.nativeElement.offsetWidth;
    // console.log(hostWidth);
    this.width = hostWidth;
    // this.width = 172;

    this.calcShadow();
    this.calcBackground();
    this.calcBorder();
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

  calcBorder(): void {
    const xOffsetAngles = 26.1421;
    this.widthBorder = this.width;
    this.heightBorder = this.height - 4 * 2;
    const o = this.widthBorder - xOffsetAngles * 2;
    const w = o + xOffsetAngles;
    const ctrX1 = w + 2.453;
    const ctrX2 = w + 4.806;
    const ctrX3 = w + 6.541;
    const lrtX = ctrX3 + 13.535;
    const ccrX1 = lrtX + 1.66;
    const ccrX2 = lrtX + 1.66;
    const ccrX3 = lrtX + 0;
    const lrbX = ccrX3 - 13.535;
    const cbrX1 = lrbX - 1.735;
    const cbrX2 = lrbX - 4.088;
    const cbrX3 = lrbX - 6.541;

    const hb = o / 2 + 6.3332;
    const ccbrX1 = hb - 0.3786;
    const ccbrX2 = hb - 0.747;
    const ccbrX3 = hb - 1.05;
    const lbrX = ccbrX3 - 2.5333;
    const ccbbX1 = lbrX - 0.4444;
    const ccbbX2 = lbrX - 1.0556;
    const ccbbX3 = lbrX - 1.5;
    const lblX = ccbbX3 - 2.5333;
    const ccblX1 = lblX - 0.303;
    const ccblX2 = lblX - 0.6714;
    const ccblX3 = lblX - 1.05;

    this.pathBorder = `
    M19.6014 7.45926
    C
    21.3361 5.72455 
    23.6889 4.75 
    26.1421 4.75
    H${w}
    C
    ${ctrX1} 4.75 
    ${ctrX2} 5.72455 
    ${ctrX3} 7.45926
    L${lrtX} 20.9948
    C
    ${ccrX1} 22.6545 
    ${ccrX2} 25.3455 
    ${ccrX3} 27.0052
    L${lrbX} 40.5407
    C
    ${cbrX1} 42.2755 
    ${cbrX2} 43.25 
    ${cbrX3} 43.25
    H${hb}
    C
    ${ccbrX1} 43.25 
    ${ccbrX2} 43.3728 
    ${ccbrX3} 43.6
    L${lbrX} 45.5
    C
    ${ccbbX1} 45.8333 
    ${ccbbX2} 45.8333 
    ${ccbbX3} 45.5
    L${lblX} 43.6
    C
    ${ccblX1} 43.3728 
    ${ccblX2} 43.25 
    ${ccblX3} 43.25
    H26.1421
    C
    23.6889 43.25 
    21.3361 42.2754 
    19.6014 40.5407
    L6.06586 27.0052
    C
    4.40613 25.3455 
    4.40614 22.6545 
    6.06586 20.9948
    L19.6014 7.45926Z`;
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
