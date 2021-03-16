import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: "Hydrogesdfsdfsdfnsdfdfsfqsf8qsf86q4s68f4q68sf468q4sf86sqsfqsf15d",
    weight: 1.0079,
    symbol: "H"
  },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  // DATAS
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = new MatTableDataSource();
  columnsToDisplay = ["position", "name", "weight", "symbol"];

  // FILTER SYSTEM
  filterValues = {
    position: "",
    name: "",
    symbol: "",
    weight: ""
  };

  // SORT SYSTEM && PAGINATOR SYSTEM
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor() {
    this.dataSource.data = ELEMENT_DATA;

    // FILTER SYSTEM
    this.dataSource.filterPredicate = this.createFilter();
  }

  // FILTER SYSTEM
  positionFilter = new FormControl("");
  nameFilter = new FormControl("");
  weightFilter = new FormControl("");
  symbolFilter = new FormControl("");

  ngOnInit() {
    // FILTER SYSTEM
    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.positionFilter.valueChanges.subscribe(position => {
      this.filterValues.position = position;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.weightFilter.valueChanges.subscribe(weight => {
      this.filterValues.weight = weight;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.symbolFilter.valueChanges.subscribe(symbol => {
      this.filterValues.symbol = symbol;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  // FILTER SYSTEM
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !==
          -1 &&
        data.position
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.position.toString().toLowerCase()) !== -1 &&
        data.weight
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.weight.toString().toLowerCase()) !== -1 &&
        data.symbol.toLowerCase().indexOf(searchTerms.symbol.toLowerCase()) !==
          -1
      );
    };
    return filterFunction;
  }
}
