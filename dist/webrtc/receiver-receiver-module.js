(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["receiver-receiver-module"],{

/***/ "AjCR":
/*!************************************************!*\
  !*** ./src/app/receiver/receiver.component.ts ***!
  \************************************************/
/*! exports provided: ReceiverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverComponent", function() { return ReceiverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_receiver_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./receiver.component.html */ "SEJ5");
/* harmony import */ var _receiver_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receiver.component.scss */ "IIDC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var ngxs_reset_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngxs-reset-plugin */ "P3uQ");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/common.service */ "OlR4");
/* harmony import */ var _receiver_action__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./receiver.action */ "RhV3");
/* harmony import */ var _receiver_selectors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./receiver.selectors */ "OFhR");
/* harmony import */ var _receiver_state__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./receiver.state */ "jWPr");














let ReceiverComponent = class ReceiverComponent {
    constructor(store, commonService, activeRoute) {
        this.store = store;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.files = [];
        this.store.dispatch(new ngxs_reset_plugin__WEBPACK_IMPORTED_MODULE_7__["StateReset"](_receiver_state__WEBPACK_IMPORTED_MODULE_13__["ReceiverState"]));
        this.leechForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            channelId: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            accessKey: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
        });
        const queryParams = this.activeRoute.snapshot.queryParams;
        if (Object.keys(queryParams).length > 0) {
            this.leechForm.patchValue(queryParams);
            if (Object.keys(queryParams).length == 2)
                this.startLeech();
        }
    }
    ngAfterViewInit() { }
    startLeech() {
        const self = this;
        const channelId = this.leechForm.get('channelId').value;
        const accessKey = this.leechForm.get('accessKey').value;
        if (channelId.trim() === '' || accessKey.trim() === '') {
            this.commonService.showDialog('Please enter id and key!!').subscribe();
            self.stepper.activeItemIndex = -1;
        }
        else {
            this.leechForm.disable();
            this.store.dispatch(new _receiver_action__WEBPACK_IMPORTED_MODULE_11__["AccessChanelAction"](channelId, accessKey));
            this.store
                .dispatch(new _receiver_action__WEBPACK_IMPORTED_MODULE_11__["SetCurrentStepAction"](1))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["concatMap"])((val) => {
                return this.store.dispatch(new _receiver_action__WEBPACK_IMPORTED_MODULE_11__["StartLeechingAction"]());
            }))
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
                fileId: Object(uuid__WEBPACK_IMPORTED_MODULE_9__["v1"])(),
                fileName: file.name,
                sendProcess: 0,
                status: 0,
                fileData: file,
            };
        });
        return filesMap;
    }
    click(item) {
        item.nodeValue = null;
        item.click();
    }
    onClose(item) { }
    showDonate(content) {
        this.commonService.showDialogWithTemplate(content);
    }
};
ReceiverComponent.ctorParameters = () => [
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Store"] },
    { type: _services_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
];
ReceiverComponent.propDecorators = {
    stepper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['stepper',] }]
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Select"])(_receiver_selectors__WEBPACK_IMPORTED_MODULE_12__["ReceiverSelectors"].chanelId)
], ReceiverComponent.prototype, "chanelId$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Select"])(_receiver_selectors__WEBPACK_IMPORTED_MODULE_12__["ReceiverSelectors"].accessKey)
], ReceiverComponent.prototype, "accessKey$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Select"])(_receiver_selectors__WEBPACK_IMPORTED_MODULE_12__["ReceiverSelectors"].localFiles)
], ReceiverComponent.prototype, "files$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Select"])(_receiver_selectors__WEBPACK_IMPORTED_MODULE_12__["ReceiverSelectors"].steps)
], ReceiverComponent.prototype, "steps$", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Select"])(_receiver_selectors__WEBPACK_IMPORTED_MODULE_12__["ReceiverSelectors"].currentStep)
], ReceiverComponent.prototype, "currentStep$", void 0);
ReceiverComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'receiver',
        template: _raw_loader_receiver_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
        styles: [_receiver_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ReceiverComponent);



/***/ }),

/***/ "IIDC":
/*!**************************************************!*\
  !*** ./src/app/receiver/receiver.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .ngx-file-drop__content {\n  position: absolute;\n  height: unset !important;\n}\n\n::ng-deep .ngx-file-drop__drop-zone {\n  border: unset !important;\n  width: 356px;\n  height: 358px !important;\n}\n\n::ng-deep tui-stepper {\n  position: relative;\n  top: 480px;\n  height: 60px;\n}\n\n::ng-deep tui-stepper button * {\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n\n::ng-deep tui-stepper button:nth-child(1) {\n  margin-right: auto;\n  margin-left: 2.5rem;\n}\n\n::ng-deep tui-stepper button:nth-child(2) {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n::ng-deep tui-stepper button:nth-child(3) {\n  margin-left: auto;\n  margin-right: 1.5rem;\n}\n\n.e2_22 {\n  background-image: url('rectangle_2.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.donate {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHJlY2VpdmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Usa0JBQUE7RUFDQSx3QkFBQTtBQURGOztBQUlBO0VBQ0Usd0JBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUFERjs7QUFFRTtFQUNFLDRCQUFBO0VBQ0EsNkJBQUE7QUFBSjs7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFBSjs7QUFFRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFBSjs7QUFFRTtFQUNFLGlCQUFBO0VBQ0Esb0JBQUE7QUFBSjs7QUFnQkE7RUFDRSx3Q0FBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7QUFiRjs7QUFnQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQWJGIiwiZmlsZSI6InJlY2VpdmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50IGNzcyBnb2VzIGhlcmVcblxuOjpuZy1kZWVwIC5uZ3gtZmlsZS1kcm9wX19jb250ZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IHVuc2V0ICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcCAubmd4LWZpbGUtZHJvcF9fZHJvcC16b25lIHtcbiAgYm9yZGVyOiB1bnNldCAhaW1wb3J0YW50O1xuICB3aWR0aDogMzU2cHg7XG4gIGhlaWdodDogMzU4cHggIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIHR1aS1zdGVwcGVye1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogNDgwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgYnV0dG9uICoge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gIH1cbiAgYnV0dG9uOm50aC1jaGlsZCgxKXtcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLWxlZnQ6IDIuNXJlbVxuICB9XG4gIGJ1dHRvbjpudGgtY2hpbGQoMil7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB9XG4gIGJ1dHRvbjpudGgtY2hpbGQoMyl7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiAxLjVyZW1cbiAgfVxufVxuXG4vLyBbZGF0YS10dWktaG9zdC1zaXplPSdsJ11bX25naG9zdC1tYmEtYzE0M10ge1xuXG4vLyAgIGhlaWdodDogdmFyKC0tdHVpLWhlaWdodC1sKTtcblxuLy8gICBtaW4taGVpZ2h0OiB2YXIoLS10dWktaGVpZ2h0LWwpO1xuXG4vLyAgIG1heC1oZWlnaHQ6IHZhcigtLXR1aS1oZWlnaHQtbCk7XG5cbi8vICAgZm9udC1zaXplOiAxNXB4O1xuXG4vLyB9XG5cbi5lMl8yMntcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uL2Fzc2V0cy9pbWFnZXMvcmVjdGFuZ2xlXzIucG5nKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLmRvbmF0ZXtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "Iab2":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "OFhR":
/*!************************************************!*\
  !*** ./src/app/receiver/receiver.selectors.ts ***!
  \************************************************/
/*! exports provided: ReceiverSelectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverSelectors", function() { return ReceiverSelectors; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _receiver_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receiver.state */ "jWPr");



class ReceiverSelectors {
    static localId(state) {
        return state.localId;
    }
    static steps(state) {
        return state.steps;
    }
    static currentStep(state) {
        return state.currentStep;
    }
    static chanelId(state) {
        return state.channelId;
    }
    static accessKey(state) {
        return state.accessKey;
    }
    static localFiles(state) {
        return state.localFiles;
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "localId", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "steps", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "currentStep", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "chanelId", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "accessKey", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_receiver_state__WEBPACK_IMPORTED_MODULE_2__["ReceiverState"]])
], ReceiverSelectors, "localFiles", null);


/***/ }),

/***/ "SEJ5":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/receiver/receiver.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--component html goes here -->\n<!--component html goes here -->\n<div class=\"e1_3\"></div>\n<div class=\"e2_21\">\n  <div class=\"relative cursor-pointer\">\n    <div class=\"e1_8 pointer-events-none\"></div>\n    <div class=\"e2_22 pointer-events-none\"></div>\n    <span class=\"e2_23 pointer-events-none\">If you like my project</span>\n    <div class=\"e2_25\">\n      <button\n        tuiButton\n        type=\"button\"\n        class=\"ei2_25_1_15\"\n        (click)=\"showDonate(template)\"\n      >\n        Donate\n      </button>\n    </div>\n    <span class=\"e2_28\"> you can </span>\n    <span class=\"e1_7 pointer-events-none\">YOUR FILE ARE SECURED</span>\n  </div>\n</div>\n<ng-container *ngIf=\"files$ | async as files\">\n  <div *ngIf=\"!files || files.length === 0\" div class=\"e1_20\">\n    <div class=\"e1_10\"></div>\n    <div class=\"e1_21\"></div>\n    <div class=\"e1_24\">\n      <span class=\"e1_22 ellipsis\">PLEASE ENTER ID AND KEY...</span>\n      <div class=\"e1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"e104_1\"\n      icon=\"tuiIconCloseLarge\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[0]\" div class=\"e1_20\">\n    <div class=\"e1_10\"></div>\n    <div class=\"e1_21\"></div>\n    <div class=\"e1_24\">\n      <span class=\"e1_22 ellipsis\">{{ files[0].fileName }}</span>\n      <div class=\"e1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"e104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[1]\" class=\"e1_33\">\n    <div class=\"ei1_33_1_10\"></div>\n    <div class=\"ei1_33_1_21\"></div>\n    <div class=\"ei1_33_1_24\">\n      <span class=\"ei1_33_1_22 ellipsis\">{{ files[1].fileName }}</span>\n      <div class=\"ei1_33_1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"ei1_33_104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n  <div *ngIf=\"files && files[2]\" class=\"e1_42\">\n    <div class=\"ei1_42_1_10\"></div>\n    <div class=\"ei1_42_1_21\"></div>\n    <div class=\"ei1_42_1_24\">\n      <span class=\"ei1_42_1_22 ellipsis\">{{ files[2].fileName }}</span>\n      <div class=\"ei1_42_1_23\"></div>\n    </div>\n    <button\n      tuiIconButton\n      type=\"button\"\n      class=\"ei1_42_104_1\"\n      icon=\"tuiIconCloseLarge\"\n      (click)=\"onClose($event)\"\n    ></button>\n  </div>\n</ng-container>\n<span class=\"e1_52 pointer-events-none\">ID:</span>\n<form class=\"b-form\" [formGroup]=\"leechForm\">\n  <tui-input class=\"e1_54\" tuiTextfieldSize=\"s\" formControlName=\"accessKey\">\n    Ask your friend about shared key\n  </tui-input>\n  <tui-input class=\"e103_20\" tuiTextfieldSize=\"s\" formControlName=\"channelId\">\n    Ask your friend about shared id\n  </tui-input>\n</form>\n<span class=\"e1_53 pointer-events-none\">KEY:</span>\n\n<tui-stepper\n  #stepper\n  [activeItemIndex]=\"currentStep$ | async\"\n  *ngIf=\"steps$ | async as steps\"\n>\n  <!-- Suppid html, Iknow, but i got problem when set stepper inside a div -->\n  <button\n    #step0Enable\n    class=\"block\"\n    tuiStep\n    [state]=\"steps[0].state\"\n    (click)=\"startLeech()\"\n    [disabled]=\"steps[0].disable\"\n    icon=\"tuiIconTimeLarge\"\n  >\n    <div class=\"w-16\">{{ steps[0].name }}</div>\n  </button>\n  <button\n    #step1Enable\n    class=\"block\"\n    tuiStep\n    [state]=\"steps[1].state\"\n    [disabled]=\"steps[1].disable\"\n    icon=\"tuiIconTimeLarge\"\n  >\n    <div class=\"w-16\">{{ steps[1].name }}</div>\n  </button>\n  <button\n    #step2Enable\n    class=\"block\"\n    tuiStep\n    [state]=\"steps[2].state\"\n    [disabled]=\"steps[2].disable\"\n    icon=\"tuiIconTimeLarge\"\n  >\n    <div class=\"w-16\">{{ steps[2].name }}</div>\n  </button>\n</tui-stepper>\n\n<ng-template #template polymorpheus let-observer>\n  <img src=\"../../assets/images/IMG_1148.JPG\" class=\"donate\">\n</ng-template>\n");

/***/ }),

/***/ "V27L":
/*!********************************************************!*\
  !*** ./src/app/services/signaling-receiver.service.ts ***!
  \********************************************************/
/*! exports provided: SignalingReceiver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingReceiver", function() { return SignalingReceiver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "MWWs");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _app_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app.model */ "KCEv");
/* harmony import */ var _signaling_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./signaling.service */ "ZOaw");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! file-saver */ "Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../receiver/receiver.action */ "RhV3");










let SignalingReceiver = class SignalingReceiver extends _signaling_service__WEBPACK_IMPORTED_MODULE_6__["SignalingService"] {
    constructor(httpClient, rxStompService, store) {
        super(httpClient, rxStompService);
        this.httpClient = httpClient;
        this.rxStompService = rxStompService;
        this.store = store;
        this.createConnection();
        console.log('SignalingReceiver init');
    }
    createConnection() {
        this.localConnection = new RTCPeerConnection(this.configuration);
        this.localConnection.addEventListener('icecandidate', (event) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('Local ICE candidate: ', event.candidate);
            if (event.candidate) {
                this.sharingICECandidateToOtherParty(event.candidate);
            }
        }));
        this.localConnection.addEventListener('datachannel', this.receiveChannelCallback.bind(this));
    }
    messageHandler(message) {
        const _super = Object.create(null, {
            messageHandler: { get: () => super.messageHandler }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!message)
                return;
            yield _super.messageHandler.call(this, message);
            switch (message.content) {
                case 'offer': {
                    yield this.localConnection.setRemoteDescription(message.data);
                    yield this.sendAnswerToSender();
                    this.crrFileInfo = message.info;
                    this.store.dispatch(new _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_9__["AddNewFileInfoAction"](this.crrFileInfo));
                    break;
                }
            }
        });
    }
    sendAnswerToSender() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const self = this;
            try {
                const answer = yield this.localConnection.createAnswer();
                yield this.localConnection.setLocalDescription(answer);
                this.rxStompService.publish({
                    destination: `/topic/${this.remoteId}`,
                    body: JSON.stringify(new _app_model__WEBPACK_IMPORTED_MODULE_5__["SignalingMessage"](this.localId, this.remoteId, 'answer', answer)),
                });
            }
            catch (e) {
                // Stupid way, but it's worked
                setTimeout(() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield self.sendAnswerToSender();
                }), 1000);
            }
        });
    }
    getNextPartInformation(chanelId) {
        return this.httpClient.get([
            src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].API_HOST,
            src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].EV_PATH,
            src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].CHANEL_PATH,
            chanelId,
            'partner',
        ].join('/'), { params: { peerId: this.localId, fileId: '' } });
    }
    preflightToSender(fileId, partId = 0) {
        let message = {
            from: this.localId,
            to: this.remoteId,
            content: 'preflight',
            data: { fileId, partId },
        };
        this.rxStompService.publish({
            destination: `/topic/${this.remoteId}`,
            body: JSON.stringify(message),
        });
    }
    receiveChannelCallback(event) {
        console.log('Receive Channel Callback');
        this.dataChannel = event.channel;
        this.dataChannel.binaryType = 'arraybuffer';
        this.dataChannel.onmessage = this.onReceiveMessageCallback.bind(this);
        this.dataChannel.onopen = this.onReceiveChannelStateChange.bind(this);
        this.dataChannel.onclose = this.onReceiveChannelStateChange.bind(this);
        this.receivedSize = 0;
        this.bitrateMax = 0;
        // this.downloadAnchor = <any>this.document.getElementById("download");
        // this.downloadAnchor.textContent = '';
        // this.downloadAnchor.removeAttribute('download');
        // if (this.downloadAnchor.href) {
        //   URL.revokeObjectURL(this.downloadAnchor.href);
        //   this.downloadAnchor.removeAttribute('href');
        // }
    }
    onReceiveMessageCallback(event) {
        console.log(`Received Message ${event.data.byteLength}`);
        this.receiveBuffer.push(event.data);
        this.receivedSize += event.data.byteLength;
        // receiveProgress.value = this.receivedSize;
        // we are assuming that our signaling protocol told
        // about the expected file size (and name, hash, etc).
        // const file = fileInput.files[0];
        const file = this.crrFileInfo;
        if (this.receivedSize === file.fileSize) {
            const received = new Blob(this.receiveBuffer);
            this.receiveBuffer = [];
            // this.downloadAnchor.href = URL.createObjectURL(received);
            // this.downloadAnchor.download = file.fileName;
            // this.downloadAnchor.textContent = `Click to download '${file.fileName}' (${file.fileSize} bytes)`;
            // this.downloadAnchor.style.display = 'block';
            file_saver__WEBPACK_IMPORTED_MODULE_7__["saveAs"](received, file.fileName);
            const blob = new Blob([received], { type: 'blob' });
            // const url= window.URL.createObjectURL(blob);
            // window.open(url);
            const bitrate = Math.round((this.receivedSize * 8) / (new Date().getTime() - this.timestampStart));
            // this.bitrateDiv.innerHTML = `<strong>Average Bitrate:</strong> ${bitrate} kbits/sec (max: ${this.bitrateMax} kbits/sec)`;
            console.log(`<strong>Average Bitrate:</strong> ${bitrate} kbits/sec (max: ${this.bitrateMax} kbits/sec)`);
            if (this.statsInterval) {
                clearInterval(this.statsInterval);
                this.statsInterval = null;
            }
            this.closeDataChannels();
        }
    }
    onReceiveChannelStateChange() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.dataChannel) {
                const readyState = this.dataChannel.readyState;
                console.log(`Receive channel state is: ${readyState}`);
                if (readyState === 'open') {
                    this.timestampStart = new Date().getTime();
                    this.timestampPrev = this.timestampStart;
                    this.statsInterval = setInterval(this.displayStats, 500);
                    yield this.displayStats();
                }
            }
        });
    }
    closeDataChannels() {
        if (this.dataChannel) {
            this.dataChannel.close();
            console.log(`Closed data channel with label: ${this.dataChannel.label}`);
            this.dataChannel = null;
            this.store.dispatch(new _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_9__["SetCurrentStepAction"](2));
        }
        this.localConnection.close();
        this.localConnection = null;
    }
};
SignalingReceiver.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_3__["RxStompService"] },
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_8__["Store"] }
];
SignalingReceiver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'any',
    })
], SignalingReceiver);



/***/ }),

/***/ "jWPr":
/*!********************************************!*\
  !*** ./src/app/receiver/receiver.state.ts ***!
  \********************************************/
/*! exports provided: ReceiverState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverState", function() { return ReceiverState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! immer */ "rfrl");
/* harmony import */ var _receiver_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./receiver.action */ "RhV3");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _services_signaling_receiver_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/signaling-receiver.service */ "V27L");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/common.service */ "OlR4");








let ReceiverState = class ReceiverState {
    constructor(injector, commonService) {
        this.injector = injector;
        this.commonService = commonService;
    }
    ngxsOnInit(ctx) {
        let localId = localStorage.getItem('localId');
        if (!localId) {
            localId = 'p' + Object(uuid__WEBPACK_IMPORTED_MODULE_5__["v1"])().replace(/\-/g, '_');
            localStorage.setItem('localId', localId);
        }
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            draft.localId = localId;
        }));
    }
    accessChanel(ctx, action) {
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            draft.channelId = action.chanelId;
            draft.accessKey = action.accessKey;
        }));
    }
    setCurrentSate(ctx, action) {
        const state = ctx.getState();
        this.signalingService = this.injector.get(_services_signaling_receiver_service__WEBPACK_IMPORTED_MODULE_6__["SignalingReceiver"]);
        this.signalingService.setLocalIdAndStartListenMessage(state.localId);
        console.log('SetCurrentStepAction', action);
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            const tep = draft.currentStep;
            draft.currentStep = action.step;
            draft.steps = draft.steps.map((step, idx) => {
                if (idx < action.step) {
                    step.state = 'pass';
                    step.disable = true;
                }
                if (idx > action.step) {
                    step.state = 'normal';
                    step.disable = true;
                }
                return step;
            });
        }));
        // Get next peer
    }
    addFiles(ctx, action) {
        console.log('Action', action);
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            if (draft.localFiles.findIndex(file => file.fileId === action.file.fileId) === -1) {
                draft.localFiles.push(Object.assign({}, action.file));
            }
        }));
    }
    startLeeching(ctx) {
        const self = this;
        const state = ctx.getState();
        console.log('startLeeching');
        this.setCurrentSate(ctx, new _receiver_action__WEBPACK_IMPORTED_MODULE_4__["SetCurrentStepAction"](1));
        // Get next peer
        // Step 1
        this.signalingService.getNextPartInformation(state.channelId).subscribe((res) => {
            if (res) {
                const senderId = res.peerId;
                ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
                    draft.peerId = senderId;
                }));
                self.signalingService.setRemoteId(senderId);
                // Step 2
                self.signalingService.preflightToSender(res.fileId, res.partId);
                this.setCurrentSate(ctx, new _receiver_action__WEBPACK_IMPORTED_MODULE_4__["SetCurrentStepAction"](2));
            }
        }, (err) => {
            console.log(err);
        });
    }
};
ReceiverState.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] },
    { type: _services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_receiver_action__WEBPACK_IMPORTED_MODULE_4__["AccessChanelAction"])
], ReceiverState.prototype, "accessChanel", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_receiver_action__WEBPACK_IMPORTED_MODULE_4__["SetCurrentStepAction"])
], ReceiverState.prototype, "setCurrentSate", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_receiver_action__WEBPACK_IMPORTED_MODULE_4__["AddNewFileInfoAction"])
], ReceiverState.prototype, "addFiles", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_receiver_action__WEBPACK_IMPORTED_MODULE_4__["StartLeechingAction"])
], ReceiverState.prototype, "startLeeching", null);
ReceiverState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'receiverState',
        defaults: {
            channelId: '',
            accessKey: '',
            localId: '',
            peerId: '',
            localFiles: [],
            peerFiles: [],
            steps: [
                { state: 'normal', disable: false, name: 'Ready' },
                { state: 'normal', disable: true, name: 'Connecting' },
                { state: 'normal', disable: true, name: 'Leeching' },
            ],
            currentStep: -1,
        },
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ReceiverState);



/***/ }),

/***/ "pQ7I":
/*!*********************************************!*\
  !*** ./src/app/receiver/receiver.module.ts ***!
  \*********************************************/
/*! exports provided: ReceiverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverModule", function() { return ReceiverModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @taiga-ui/kit */ "3tQ6");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @taiga-ui/core */ "11mb");
/* harmony import */ var _receiver_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./receiver.component */ "AjCR");
/* harmony import */ var _receiver_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./receiver.state */ "jWPr");
/* harmony import */ var ngx_file_drop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-file-drop */ "gfTr");
/* harmony import */ var _services_signaling_receiver_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/signaling-receiver.service */ "V27L");

// Angular Imports







// This Module's Components





let ReceiverModule = class ReceiverModule {
};
ReceiverModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                {
                    path: '',
                    component: _receiver_component__WEBPACK_IMPORTED_MODULE_8__["ReceiverComponent"],
                },
            ]),
            _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([_receiver_state__WEBPACK_IMPORTED_MODULE_9__["ReceiverState"]]),
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_7__["TuiButtonModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_6__["TuiStepperModule"],
            ngx_file_drop__WEBPACK_IMPORTED_MODULE_10__["NgxFileDropModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_6__["TuiInputModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_7__["TuiTextfieldControllerModule"],
        ],
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["AsyncPipe"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_6__["TuiStepperComponent"], _services_signaling_receiver_service__WEBPACK_IMPORTED_MODULE_11__["SignalingReceiver"]],
        declarations: [_receiver_component__WEBPACK_IMPORTED_MODULE_8__["ReceiverComponent"]],
        exports: [_receiver_component__WEBPACK_IMPORTED_MODULE_8__["ReceiverComponent"]],
    })
], ReceiverModule);



/***/ })

}]);
//# sourceMappingURL=receiver-receiver-module.js.map