import { Directive, OnInit, Renderer2, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[resizeColumn]"
})
export class ResizeColumnDirective implements OnInit {
  @Input("resizeColumn") resizable: boolean;

  private startX: number;
  private startWidth: number;

  private column: HTMLElement;
  private table: HTMLElement;

  private pressed: boolean;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.column = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (this.resizable) {
      const row = this.renderer.parentNode(this.column);
      const thead = this.renderer.parentNode(row);
      this.table = this.renderer.parentNode(thead);

      const resizer = this.renderer.createElement("span");
      this.renderer.addClass(resizer, "resize-holder");

      this.renderer.appendChild(this.column, resizer);
      this.renderer.listen(resizer, "mousedown", this.onMouseDown);
      this.renderer.listen(this.table, "mousemove", this.onMouseMove);
      this.renderer.listen("document", "mouseup", this.onMouseUp);
    }
  }

  onMouseDown = (event: MouseEvent): void => {
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;
  };

  onMouseMove = (event: MouseEvent): void => {
    if (this.pressed && event.buttons) {
      this.renderer.addClass(this.table, "resizing");

      // Calculate width of column
      const width = this.startWidth + (event.pageX - this.startX);

      const tableHeader = Array.from(
        this.table.querySelectorAll(".mat-header-row")
      ).map((row: any) =>
        row.querySelectorAll(".mat-header-cell").item(this.column.id)
      );
      const tableCells = Array.from(
        this.table.querySelectorAll(".mat-row")
      ).map((row: any) =>
        row.querySelectorAll(".mat-cell").item(this.column.id)
      );

      // Set table header width
      for (const header of tableHeader) {
        this.renderer.setStyle(header, "width", `${width}px`);
      }
      // Set table cells width
      for (const cell of tableCells) {
        this.renderer.setStyle(cell, "width", `${width}px`);
      }
    }
  };

  onMouseUp = (): void => {
    if (this.pressed) {
      this.pressed = false;
      this.renderer.removeClass(this.table, "resizing");
    }
  };
}
