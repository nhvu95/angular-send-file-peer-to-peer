(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sender-sender-module"],{

/***/ "2iOY":
/*!*****************************************!*\
  !*** ./src/app/sender/sender.module.ts ***!
  \*****************************************/
/*! exports provided: SenderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderModule", function() { return SenderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @taiga-ui/core */ "11mb");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @taiga-ui/kit */ "3tQ6");
/* harmony import */ var ngx_file_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-file-drop */ "gfTr");
/* harmony import */ var _sender_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sender.component */ "znQw");
/* harmony import */ var _sender_state__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sender.state */ "cXiT");

// Angular Imports








// This Module's Components


let SenderModule = class SenderModule {
};
SenderModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                {
                    path: '',
                    component: _sender_component__WEBPACK_IMPORTED_MODULE_9__["SenderComponent"],
                }
            ]),
            _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([_sender_state__WEBPACK_IMPORTED_MODULE_10__["SenderState"]]),
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__["TuiRootModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_7__["TuiMarkerIconModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__["TuiButtonModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_7__["TuiStepperModule"],
            ngx_file_drop__WEBPACK_IMPORTED_MODULE_8__["NgxFileDropModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        ],
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["AsyncPipe"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_7__["TuiStepperComponent"]],
        declarations: [_sender_component__WEBPACK_IMPORTED_MODULE_9__["SenderComponent"]],
        exports: [],
    })
], SenderModule);



/***/ }),

/***/ "Iw8q":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sender/sender.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--component html goes here -->\n<!--component html goes here -->\n<div class=\"e1_3\"></div>\n<ngx-file-drop\n  class=\"e2_21\"\n  dropZoneLabel=\"Drop files here\"\n  (onFileDrop)=\"dropped($event)\"\n  (onFileOver)=\"fileOver($event)\"\n  (onFileLeave)=\"fileLeave($event)\"\n>\n  <ng-template\n    ngx-file-drop-content-tmp\n    let-openFileSelector=\"openFileSelector\"\n  >\n    <div class=\"relative cursor-pointer\">\n      <div class=\"e1_8 pointer-events-none\"></div>\n      <div class=\"e2_22 pointer-events-none\"></div>\n      <span class=\"e2_23 pointer-events-none\">Drop your files here</span>\n      <div class=\"e2_25\">\n        <button\n          tuiButton\n          type=\"button\"\n          class=\"ei2_25_1_15\"\n          (click)=\"openFileSelector()\"\n        >\n          Browse\n        </button>\n      </div>\n      <span class=\"e2_28\"> or </span>\n      <span class=\"e1_7 pointer-events-none\">UPLOAD YOUR FILES</span>\n    </div>\n  </ng-template>\n</ngx-file-drop>\n<ng-container *ngIf=\"files$ | async as files\">\n  <div *ngIf=\"!files || files.length === 0\" div class=\"e1_20\">\n    <div class=\"e1_10\"></div>\n    <div class=\"e1_21\"></div>\n    <div class=\"e1_24\">\n      <span class=\"e1_22 ellipsis\">PLEASE SELECT AT LEAST 1 FILE...</span>\n      <div class=\"e1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"e104_1\"\n      icon=\"tuiIconCloseLarge\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[0]\" div class=\"e1_20\">\n    <div class=\"e1_10\"></div>\n    <div class=\"e1_21\"></div>\n    <div class=\"e1_24\">\n      <span class=\"e1_22 ellipsis\">{{ files[0].fileName }}</span>\n      <div class=\"e1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"e104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[1]\" class=\"e1_33\">\n    <div class=\"ei1_33_1_10\"></div>\n    <div class=\"ei1_33_1_21\"></div>\n    <div class=\"ei1_33_1_24\">\n      <span class=\"ei1_33_1_22 ellipsis\">{{ files[1].fileName }}</span>\n      <div class=\"ei1_33_1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"ei1_33_104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[2]\" class=\"e1_42\">\n    <div class=\"ei1_42_1_10\"></div>\n    <div class=\"ei1_42_1_21\"></div>\n    <div class=\"ei1_42_1_24\">\n      <span class=\"ei1_42_1_22 ellipsis\">{{ files[2].fileName }}</span>\n      <div class=\"ei1_42_1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"ei1_42_104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n</ng-container>\n<span class=\"e1_52 pointer-events-none\">ID:</span\n><span class=\"e1_54\">{{ accessKey$ | async }}</span\n><span class=\"e103_20\">{{ channelId$ | async }}</span\n><span class=\"e1_53 pointer-events-none\">KEY:</span>\n<tui-stepper #stepper\n  [activeItemIndex]=\"currentStep$ | async\"\n  *ngIf=\"steps$ | async as steps\"\n>\n  <button #step0Enable class=\"block\" tuiStep [state]=\"steps[0].state\" (click)=\"initChanel()\" [disabled]=\"steps[0].disable\" icon=\"tuiIconTimeLarge\">\n    <div class=\"w-16\">{{steps[0].name}}</div>\n  </button>\n  <button #step1Enable class=\"block\" tuiStep [state]=\"steps[1].state\" (click)=\"startSeeding()\" [disabled]=\"steps[1].disable\" icon=\"tuiIconTimeLarge\">\n    <div class=\"w-16\">{{steps[1].name}}</div>\n  </button>\n  <button #step2Enable class=\"block\" tuiStep [state]=\"steps[2].state\" [disabled]=\"steps[2].disable\" icon=\"tuiIconTimeLarge\">\n    <div class=\"w-16\">{{steps[2].name}}</div>\n  </button>\n</tui-stepper>");

/***/ }),

/***/ "hIVy":
/*!**********************************************!*\
  !*** ./src/app/sender/sender.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .ngx-file-drop__content {\n  position: absolute;\n  height: unset !important;\n}\n\n::ng-deep .ngx-file-drop__drop-zone {\n  border: unset !important;\n  width: 356px;\n  height: 358px !important;\n}\n\n::ng-deep tui-stepper {\n  position: relative;\n  top: 480px;\n  height: 60px;\n}\n\n::ng-deep tui-stepper button * {\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n\n::ng-deep tui-stepper button:nth-child(1) {\n  margin-right: auto;\n  margin-left: 2.5rem;\n}\n\n::ng-deep tui-stepper button:nth-child(2) {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n::ng-deep tui-stepper button:nth-child(3) {\n  margin-left: auto;\n  margin-right: 1.5rem;\n}\n\n.e2_22 {\n  background-image: url('rectangle_3.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.e103_20 {\n  top: 396px;\n}\n\n.e1_54 {\n  top: 435px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNlbmRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFBO0VBQ0Esd0JBQUE7QUFERjs7QUFJQTtFQUNFLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLHdCQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0FBREY7O0FBRUU7RUFDRSw0QkFBQTtFQUNBLDZCQUFBO0FBQUo7O0FBRUU7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBRUU7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBRUU7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0FBQUo7O0FBSUE7RUFDRSx3Q0FBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLFVBQUE7QUFERjs7QUFJQTtFQUNFLFVBQUE7QUFERiIsImZpbGUiOiJzZW5kZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb21wb25lbnQgY3NzIGdvZXMgaGVyZVxuXG46Om5nLWRlZXAgLm5neC1maWxlLWRyb3BfX2NvbnRlbnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGhlaWdodDogdW5zZXQgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5uZ3gtZmlsZS1kcm9wX19kcm9wLXpvbmUge1xuICBib3JkZXI6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAzNTZweDtcbiAgaGVpZ2h0OiAzNThweCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAgdHVpLXN0ZXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogNDgwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgYnV0dG9uICoge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gIH1cbiAgYnV0dG9uOm50aC1jaGlsZCgxKSB7XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi1sZWZ0OiAyLjVyZW07XG4gIH1cbiAgYnV0dG9uOm50aC1jaGlsZCgyKSB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB9XG4gIGJ1dHRvbjpudGgtY2hpbGQoMykge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogMS41cmVtO1xuICB9XG59XG5cbi5lMl8yMiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi9hc3NldHMvaW1hZ2VzL3JlY3RhbmdsZV8zLnBuZyk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbi5lMTAzXzIwIHtcbiAgdG9wOiAzOTZweDtcbn1cblxuLmUxXzU0IHtcbiAgdG9wOiA0MzVweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "znQw":
/*!********************************************!*\
  !*** ./src/app/sender/sender.component.ts ***!
  \********************************************/
/*! exports provided: SenderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderComponent", function() { return SenderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_sender_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./sender.component.html */ "Iw8q");
/* harmony import */ var _sender_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sender.component.scss */ "hIVy");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var ngxs_reset_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngxs-reset-plugin */ "P3uQ");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/common.service */ "OlR4");
/* harmony import */ var _sender_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sender.action */ "jSkY");
/* harmony import */ var _sender_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sender.selectors */ "phrQ");
/* harmony import */ var _sender_state__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sender.state */ "cXiT");











let SenderComponent = class SenderComponent {
    constructor(store, commonService) {
        this.store = store;
        this.commonService = commonService;
        this.files = [];
        console.log('SenderComponent init');
        this.store.dispatch(new ngxs_reset_plugin__WEBPACK_IMPORTED_MODULE_5__["StateReset"](_sender_state__WEBPACK_IMPORTED_MODULE_10__["SenderState"]));
    }
    ngAfterViewInit() { }
    initChanel() {
        const files = this.store.selectSnapshot(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].localFiles);
        if (files && files.length > 0) {
            return this.store.dispatch(new _sender_action__WEBPACK_IMPORTED_MODULE_8__["InitChanelAction"]());
        }
        else {
            this.stepper.activeItemIndex = -1;
            return this.commonService
                .showDialog('Please select atleast 1 file..')
                .subscribe();
        }
    }
    fileMapping(files) {
        let mapList = [];
        if (files instanceof FileList)
            mapList = Array.from(files);
        else
            mapList = files;
        const filesMap = mapList.map((file) => {
            return {
                fileId: 'f' + Object(uuid__WEBPACK_IMPORTED_MODULE_6__["v1"])().replace(/\-/g, '_'),
                fileName: file.name,
                sendProcess: 0,
                status: 0,
                fileData: file,
                totalPart: 1,
            };
        });
        return filesMap;
    }
    click(item) {
        item.nodeValue = null;
        item.click();
    }
    onClose(item) { }
    //dragDropFilePart
    dropped(files) {
        this.files = files;
        for (const droppedFile of files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry;
                fileEntry.file((file) => {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);
                    this.store.dispatch(new _sender_action__WEBPACK_IMPORTED_MODULE_8__["AppendFilesAction"](this.fileMapping([file])));
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }
    fileOver(event) {
        console.log(event);
    }
    fileLeave(event) {
        console.log(event);
    }
};
SenderComponent.ctorParameters = () => [
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"] },
    { type: _services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
];
SenderComponent.propDecorators = {
    stepper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['stepper',] }]
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Select"])(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].channelId)
], SenderComponent.prototype, "channelId$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Select"])(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].accessKey)
], SenderComponent.prototype, "accessKey$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Select"])(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].localFiles)
], SenderComponent.prototype, "files$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Select"])(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].steps)
], SenderComponent.prototype, "steps$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Select"])(_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].currentStep)
], SenderComponent.prototype, "currentStep$", void 0);
SenderComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'sender',
        template: _raw_loader_sender_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
        styles: [_sender_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SenderComponent);



/***/ })

}]);
//# sourceMappingURL=sender-sender-module.js.map