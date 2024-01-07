import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'getFirstCharacter' })
export class MoWbSitesListReportSidebarPipe implements PipeTransform {
   transform(string: string) {
    return string.slice(0,1);
   }
}

@Pipe({ name: 'getRandomColor' })
export class MoWbSitesListReportSidebar2Pipe implements PipeTransform {
   transform(string: string) {
      const arrayColor = ["#226FF5", "#E62222", "#F97316", "#FFB700", "#84CC16", "#00BC32", "#06B6D4", "#0EA5E9", "#6366F1", "#5B04B3", "#D946EF", "#EC4899", "#F43F5E", "#757380", "#202020"]
      return getRandomElement(arrayColor);
   }
}

@Pipe({ name: 'convertTimeUTC' })
export class MoWbSitesListReportSidebar3Pipe implements PipeTransform {
   transform(time: string) {
    const timeStamp = new Date(time);
    return timeStamp.getTime();
   }
}

function getRandomElement(array: Array<any>) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    MoWbSitesListReportSidebarPipe,
    MoWbSitesListReportSidebar2Pipe,
    MoWbSitesListReportSidebar3Pipe
  ],
  exports: [
    MoWbSitesListReportSidebarPipe,
    MoWbSitesListReportSidebar2Pipe,
    MoWbSitesListReportSidebar3Pipe
  ]
})

export class FileManagerSettingsAccountPipeModule { }
