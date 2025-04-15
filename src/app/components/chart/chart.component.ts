import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, input, OnDestroy, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BarData } from '../../interface/assetInterfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  providers: [DatePipe],
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe){
    Chart.register(...registerables);
  }

  readonly barsData = input<BarData[]>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('chartWrapper', { static: true }) chartWrapperRef!: ElementRef;

  public chartType: ChartType = 'line';
  chartData!: ChartData<'line'>;
  public chartOptions: ChartConfiguration['options'] = {};

  private resizeObserver?: ResizeObserver;
  private lastIsPortrait: boolean | null = null;
  private resizeTimeout: any;

  ngAfterViewInit(): void {
    this.applyResponsiveOptions();

    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.applyResponsiveOptions();
        this.drawChart(this.barsData());
      }, 200); // debounce
    });

    this.resizeObserver.observe(this.chartWrapperRef.nativeElement);
  }

  drawChart(barData:BarData[] | undefined){

    if(!barData) return;    
    
    const lineCharLabels = barData.map(item => this.datePipe.transform(item.t.split('T')[0], 'MM/yy') || '');
    
    const lineChartData = barData.map(item => item.c);
    const volumeData = barData.map(item => item.v);

    this.chartData = {
      labels: lineCharLabels,
      datasets: [
        {
          label: 'Closing',
          data: lineChartData,
          borderColor: '#1382aa',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: false,
        },        
      ],
    };  
    this.cdr.detectChanges();
    this.chart?.update();    
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    clearTimeout(this.resizeTimeout);
  }

  private applyResponsiveOptions(): void {
    const isPortrait = window.innerHeight > window.innerWidth;

    // Only update if orientation has changed
    if (this.lastIsPortrait === isPortrait) return;

    this.lastIsPortrait = isPortrait;

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: isPortrait ? 1 : 2, // 1:1 for portrait, 2:1 for landscape
      plugins: {
        legend: { display: true },
      },
    };

    setTimeout(() => {
      this.chart?.chart?.destroy();
      this.chart?.render();
    });
  }
}
