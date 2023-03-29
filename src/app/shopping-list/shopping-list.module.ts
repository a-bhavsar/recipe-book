import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoggingService } from "src/logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations : [
        ShoppingListComponent,
         ShoppingEditComponent,
    ],
    imports : [
        FormsModule,
        RouterModule.forChild([
            {
                path : '',
                component : ShoppingListComponent
            }
        ]),
        SharedModule
    ],
    exports : [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    providers : [LoggingService]
})
export class ShoppingListModule{

}