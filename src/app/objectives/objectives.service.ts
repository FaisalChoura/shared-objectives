import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, tap, switchMap } from "rxjs/operators";

import { Objective, Task } from "./objective.model";

@Injectable({
  providedIn: "root"
})
export class ObjectivesService {
  private _objectives = new BehaviorSubject<Objective[]>([]);

  get objectives() {
    return this._objectives.asObservable();
  }

  constructor() {
    const objectives: Objective[] = [
      new Objective("123", "Summer Trip 2020", [
        new Task(
          "Check available times",
          "Contact everyone and check their free times"
        )
      ]),
      new Objective("345", "Plan April Web Summit", [
        new Task(
          "Collect vendor data",
          "Contact all vendors and request their data"
        )
      ])
    ];
    this._objectives.next(objectives);
  }

  getObjective(id: string) {
    return this.objectives.pipe(
      take(1),
      switchMap(objectives => {
        return objectives.filter(o => o.id === id);
      })
    );
  }

  createObjective(objective: Objective) {
    return this.objectives.pipe(
      take(1),
      tap(objectives => {
        this._objectives.next(objectives.concat(objective));
      })
    );
  }

  editObjective(objective: Objective) {}
}