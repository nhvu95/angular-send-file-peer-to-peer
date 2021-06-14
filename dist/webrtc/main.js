(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Angular\webrtc\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // API_HOST: 'https://7rhpjdl0sg.execute-api.us-east-2.amazonaws.com',
    API_HOST: 'https://7rhpjdl0sg.execute-api.us-east-2.amazonaws.com',
    EV_PATH: 'dev',
    CHANEL_PATH: 'chanel',
    INITIALIZE_PATH: 'initialize-chanel',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Bvwn":
/*!*********************************************!*\
  !*** ./src/app/services/rx-stomp.config.ts ***!
  \*********************************************/
/*! exports provided: RTCRxStompConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RTCRxStompConfig", function() { return RTCRxStompConfig; });
const RTCRxStompConfig = {
    // Which server?
    brokerURL: 'wss://b-5e1f8142-e4d2-4755-a82a-753f6bdc572b-1.mq.us-east-2.amazonaws.com:61619',
    // Headers
    // Typical keys: login, passcode, host
    connectHeaders: {
        login: 'webrtcclient',
        passcode: 'webrtcclient',
    },
    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 500 (500 milli seconds)
    reconnectDelay: 200,
    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    debug: (msg) => {
        // console.log(new Date(), msg);
    },
};


/***/ }),

/***/ "C5g5":
/*!*************************************************!*\
  !*** ./src/app/interceptor/http.interceptor.ts ***!
  \*************************************************/
/*! exports provided: HttpConfigInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpConfigInterceptor", function() { return HttpConfigInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/common.service */ "OlR4");






let HttpConfigInterceptor = class HttpConfigInterceptor {
    constructor(commonService) {
        this.commonService = commonService;
    }
    intercept(request, next) {
        // ...
        const token = localStorage.getItem('accessKey');
        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', token),
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json'),
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
        });
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((event) => {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                console.log('event--->>>', event);
            }
            return event;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((error) => {
            if (error.status === 404 || error.status === 400) {
                this.commonService.showDialog(error.error.message).subscribe();
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }));
    }
};
HttpConfigInterceptor.ctorParameters = () => [
    { type: _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
];
HttpConfigInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], HttpConfigInterceptor);



/***/ }),

/***/ "KCEv":
/*!******************************!*\
  !*** ./src/app/app.model.ts ***!
  \******************************/
/*! exports provided: SignalingMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingMessage", function() { return SignalingMessage; });
class SignalingMessage {
    constructor(from, to, content, data, info = null) {
        this.from = from;
        this.to = to;
        this.content = content;
        this.data = data;
        this.info = info;
    }
}


/***/ }),

/***/ "OODc":
/*!******************************************************!*\
  !*** ./src/app/services/signaling-sender.service.ts ***!
  \******************************************************/
/*! exports provided: SignalingSender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingSender", function() { return SignalingSender; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "MWWs");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _app_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app.model */ "KCEv");
/* harmony import */ var _sender_sender_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sender/sender.selectors */ "phrQ");
/* harmony import */ var _signaling_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./signaling.service */ "ZOaw");









let SignalingSender = class SignalingSender extends _signaling_service__WEBPACK_IMPORTED_MODULE_8__["SignalingService"] {
    constructor(httpClient, rxStompService, store) {
        super(httpClient, rxStompService);
        this.httpClient = httpClient;
        this.rxStompService = rxStompService;
        this.store = store;
        console.log('SignalingSender init');
    }
    createConnection() {
        this.localConnection = new RTCPeerConnection(this.configuration);
        //prettier-ignore
        this.dataChannel = this.localConnection.createDataChannel('sendDataChannel');
        this.dataChannel.onopen = this.onSendChannelStateChange.bind(this);
        this.localConnection.addEventListener('icecandidate', (event) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('Local ICE candidate: ', event.candidate);
            if (event.candidate) {
                this.sharingICECandidateToOtherParty(event.candidate);
            }
        }));
    }
    messageHandler(message) {
        const _super = Object.create(null, {
            messageHandler: { get: () => super.messageHandler }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!message)
                return;
            switch (message.content) {
                case 'preflight': {
                    console.log('Got preflight message');
                    this.setRemoteId(message.from);
                    this.createConnection();
                    yield this.sendOfferToReceiver(message.data);
                    break;
                }
                case 'answer': {
                    yield this.localConnection.setRemoteDescription(message.data);
                    break;
                }
            }
            yield _super.messageHandler.call(this, message);
        });
    }
    sendOfferToReceiver(askingFile) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                //prettier-ignore
                const files = this.store.selectSnapshot(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_7__["SenderSelectors"].localFiles);
                const file = files.find((file) => file.fileId === askingFile.fileId);
                if (file) {
                    const offer = yield this.localConnection.createOffer();
                    yield this.localConnection.setLocalDescription(offer);
                    this.rxStompService.publish({
                        destination: `/topic/${this.remoteId}`,
                        body: JSON.stringify(new _app_model__WEBPACK_IMPORTED_MODULE_6__["SignalingMessage"](this.localId, this.remoteId, 'offer', offer, {
                            fileName: file.fileName,
                            fileId: file.fileId,
                            fileSize: file.fileData.size,
                            totalPart: file.totalPart,
                        })),
                    });
                }
                else {
                    console.log('File not exist: ');
                }
            }
            catch (e) {
                console.log('Failed to create session description: ', e);
            }
        });
    }
    onSendChannelStateChange() {
        if (this.dataChannel) {
            const readyState = this.dataChannel.readyState;
            console.log(`Send channel state is: ${readyState}`);
            if (readyState === 'open') {
                this._dataChannel.next('open');
            }
        }
    }
    sendData(fileInput) {
        const self = this;
        const file = fileInput;
        const fileData = file.fileData;
        console.log(`File is ${file.fileName}`);
        // Handle 0 size files.
        // statusMessage.textContent = '';
        // downloadAnchor.textContent = '';
        if (fileData.size === 0) {
            // bitrateDiv.innerHTML = '';
            // statusMessage.textContent = 'File is empty, please select a non-empty file';
            this.closeDataChannels();
            return;
        }
        // sendProgress.max = fileData.size;
        // receiveProgress.max = fileData.size;
        const chunkSize = 16384;
        const fileReader = new FileReader();
        let offset = 0;
        fileReader.addEventListener('error', (error) => console.error('Error reading file:', error));
        fileReader.addEventListener('abort', (event) => console.log('File reading aborted:', event));
        fileReader.addEventListener('load', (e) => {
            console.log('FileRead.onload ', e);
            const data = e.target.result;
            self.dataChannel.send(data);
            offset += data.byteLength;
            // sendProgress.value = offset;
            if (offset < fileData.size) {
                readSlice(offset);
            }
        });
        const readSlice = (o) => {
            console.log('readSlice ', o);
            const slice = fileData.slice(offset, o + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };
        readSlice(0);
    }
    closeDataChannels() {
        console.log('Closing data channels');
        this.dataChannel.close();
        console.log(`Closed data channel with label: ${this.dataChannel.label}`);
        this.dataChannel = null;
        // Send close connect to receiver
        this.rxStompService.publish({
            destination: `/topic/${this.remoteId}`,
            body: JSON.stringify({
                from: this.localId,
                to: this.remoteId,
                closeChanel: this.dataChannel.label,
            }),
        });
        this.localConnection.close();
        this.localConnection = null;
        console.log('Closed peer connections');
    }
    initCoordinatorChanel(body) {
        return this.httpClient.post([
            src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].API_HOST,
            src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].EV_PATH,
            src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].INITIALIZE_PATH,
        ].join('/'), body);
    }
};
SignalingSender.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_4__["RxStompService"] },
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }
];
SignalingSender = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'any',
    })
], SignalingSender);



/***/ }),

/***/ "OlR4":
/*!********************************************!*\
  !*** ./src/app/services/common.service.ts ***!
  \********************************************/
/*! exports provided: CommonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonService", function() { return CommonService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taiga-ui/core */ "11mb");



let CommonService = class CommonService {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }
    showDialog(message, header = 'Error', size = 's') {
        return this.dialogService.open(message, {
            label: header,
            size: size,
        });
    }
    showDialogWithTemplate(content) {
        this.dialogService.open(content).subscribe();
    }
};
CommonService.ctorParameters = () => [
    { type: _taiga_ui_core__WEBPACK_IMPORTED_MODULE_2__["TuiDialogService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_taiga_ui_core__WEBPACK_IMPORTED_MODULE_2__["TuiDialogService"],] }] }
];
CommonService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], CommonService);



/***/ }),

/***/ "RhV3":
/*!*********************************************!*\
  !*** ./src/app/receiver/receiver.action.ts ***!
  \*********************************************/
/*! exports provided: AccessChanelAction, AddNewFileInfoAction, SetCurrentStepAction, StartLeechingAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessChanelAction", function() { return AccessChanelAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNewFileInfoAction", function() { return AddNewFileInfoAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCurrentStepAction", function() { return SetCurrentStepAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartLeechingAction", function() { return StartLeechingAction; });
class AccessChanelAction {
    constructor(chanelId, accessKey) {
        this.chanelId = chanelId;
        this.accessKey = accessKey;
    }
}
AccessChanelAction.type = 'Receiver AccessChanel';
class AddNewFileInfoAction {
    constructor(file) {
        this.file = file;
    }
}
AddNewFileInfoAction.type = 'Receiver Add new file action';
class SetCurrentStepAction {
    constructor(step) {
        this.step = step;
    }
}
SetCurrentStepAction.type = 'Receiver Set current step';
class StartLeechingAction {
    constructor() { }
}
StartLeechingAction.type = 'Receiver Start leeching';


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-clipboard */ "Dvla");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sender/sender.selectors */ "phrQ");










let AppComponent = class AppComponent {
    constructor(router, store, ngxCopy) {
        this.router = router;
        this.store = store;
        this.ngxCopy = ngxCopy;
        this.title = 'webrtc';
        this.isSender$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
        this.isSender$ = this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationEnd"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((e) => e.url === '/' || e.url === 'sender'));
    }
    copyData() {
        const channelId = this.store.selectSnapshot(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].channelId);
        const accessKey = this.store.selectSnapshot(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].accessKey);
        this.ngxCopy.copy(channelId + '\n' + accessKey);
    }
    copyLink() {
        const channelId = this.store.selectSnapshot(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].channelId);
        const accessKey = this.store.selectSnapshot(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].accessKey);
        const hostName = window.location.hostname;
        const finalContent = `${hostName}/receiver?channelId=${channelId}&accessKey=${accessKey}`;
        console.log('copyLink', finalContent);
        this.ngxCopy.copy(finalContent);
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"] },
    { type: ngx_clipboard__WEBPACK_IMPORTED_MODULE_6__["ClipboardService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Select"])(_sender_sender_selectors__WEBPACK_IMPORTED_MODULE_9__["SenderSelectors"].isReadyToSend)
], AppComponent.prototype, "readyToSend$", void 0);
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'et-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppComponent);



/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<tui-root>\n  <div class=\"e1_2\">\n    <div class=\"e3_20\">\n      <div class=\"e1_57 z-10\">\n        <span class=\"e1_59 cursor-pointer\" [routerLink]=\"'receiver'\"\n          >RECEIVE</span\n        >\n        <span class=\"e1_56 cursor-pointer\" [routerLink]=\"'./'\">SEND</span>\n        <div class=\"e2_32 cursor-pointer\"></div>\n      </div>\n      <router-outlet></router-outlet>\n    </div>\n    <span class=\"e103_61\">copyright: www.nhvu95.com</span>\n    <div class=\"e103_63\">\n      <div class=\"e103_62\"></div>\n      <ul class=\"e103_59\">\n        <li>1. NO STORE YOUR FILE ON SERVER</li>\n        <li>2. SEND DIRECTLY TO YOUR FRIENDS</li>\n        <li>3. SECURED YOUR FILE</li>\n        <li>4. FREE</li>\n      </ul>\n    </div>\n    <div *ngIf=\"readyToSend$ | async; else copyDisabled\" class=\"e105_52\">\n      <button\n        tuiIconButton\n        appearance=\"flat\"\n        icon=\"tuiIconCopyLarge\"\n        class=\"e105_47\"\n        (click)=\"copyData()\"\n      ></button>\n      <button\n        tuiIconButton\n        appearance=\"flat\"\n        icon=\"tuiIconLinkLarge\"\n        class=\"e105_60\"\n        (click)=\"copyLink()\"\n      ></button>\n    </div>\n    <ng-template #copyDisabled>\n      <div *ngIf=\"isSender$ | async\" class=\"e105_52 opacity-50\">\n        <button\n          disabled\n          tuiIconButton\n          appearance=\"flat\"\n          icon=\"tuiIconCopyLarge\"\n          class=\"e105_47\"\n        ></button>\n        <button\n          disabled\n          tuiIconButton\n          appearance=\"flat\"\n          icon=\"tuiIconLinkLarge\"\n          class=\"e105_60\"\n        ></button>\n      </div>\n    </ng-template>\n  </div>\n</tui-root>\n");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @taiga-ui/core */ "11mb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _services_rx_stomp_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/rx-stomp.config */ "Bvwn");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "MWWs");
/* harmony import */ var _app_state__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.state */ "z+ja");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @taiga-ui/kit */ "3tQ6");
/* harmony import */ var _interceptor_http_interceptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./interceptor/http.interceptor */ "C5g5");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/common.service */ "OlR4");

















let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_9__["TuiRootModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_14__["TuiAvatarModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_9__["TuiButtonModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_9__["TuiDialogModule"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_6__["NgxsModule"].forRoot([_app_state__WEBPACK_IMPORTED_MODULE_13__["AppState"]], {
                developmentMode: !src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].production,
            }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
        ],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"],
            {
                provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HTTP_INTERCEPTORS"],
                useClass: _interceptor_http_interceptor__WEBPACK_IMPORTED_MODULE_15__["HttpConfigInterceptor"],
                multi: true,
            },
            {
                provide: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_12__["InjectableRxStompConfig"],
                useValue: _services_rx_stomp_config__WEBPACK_IMPORTED_MODULE_11__["RTCRxStompConfig"],
            },
            {
                provide: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_12__["RxStompService"],
                useFactory: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_12__["rxStompServiceFactory"],
                deps: [_stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_12__["InjectableRxStompConfig"]],
            },
            _services_common_service__WEBPACK_IMPORTED_MODULE_16__["CommonService"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "ZOaw":
/*!***********************************************!*\
  !*** ./src/app/services/signaling.service.ts ***!
  \***********************************************/
/*! exports provided: SignalingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingService", function() { return SignalingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "MWWs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");





let SignalingService = class SignalingService {
    constructor(httpClient, rxStompService) {
        this.httpClient = httpClient;
        this.rxStompService = rxStompService;
        this.configuration = { 'iceServers': [{ 'urls': 'turn:18.219.253.176:3478?transport=tcp', "username": "<USERNAME>", "credential": "<PASSWORD>" }] };
        this._receivedMessages = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.receivedMessages$ = this._receivedMessages.asObservable();
        this._dataChannel = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.dataChannel$ = this._dataChannel.asObservable();
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.bytesPrev = 0;
        this.timestampPrev = 0;
        this.statsInterval = null;
        this.bitrateMax = 0;
        this.receivedMessages$.subscribe((message) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.messageHandler(message);
        }));
    }
    createConnection() { }
    messageHandler(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (message.content === 'iceCandidate' && message.data) {
                console.log("Got iceCandidate message");
                try {
                    this.localConnection.addIceCandidate(message.data);
                }
                catch (e) {
                    debugger;
                    console.log(e);
                }
            }
        });
    }
    subcribeMessage() {
        this.rxStompService
            .watch(`/topic/${this.localId}`)
            .subscribe((message) => {
            this._receivedMessages.next(JSON.parse(message.body));
        });
    }
    setLocalIdAndStartListenMessage(localId) {
        this.localId = localId;
        this.subcribeMessage();
    }
    setRemoteId(remoteId) {
        this.remoteId = remoteId;
    }
    sharingICECandidateToOtherParty(candidate) {
        const message = {
            from: this.localId,
            to: this.remoteId,
            content: 'iceCandidate',
            data: candidate
        };
        this.rxStompService.publish({
            destination: `/topic/${this.remoteId}`,
            body: JSON.stringify(message),
        });
    }
    // display bitrate statistics.
    displayStats() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.localConnection &&
                this.localConnection.iceConnectionState === 'connected') {
                const stats = yield this.localConnection.getStats();
                let activeCandidatePair;
                stats.forEach((report) => {
                    if (report.type === 'transport') {
                        // activeCandidatePair = stats.get(report.selectedCandidatePairId);
                    }
                });
                if (activeCandidatePair) {
                    if (this.timestampPrev === activeCandidatePair.timestamp) {
                        return;
                    }
                    // calculate current bitrate
                    const bytesNow = activeCandidatePair.bytesReceived;
                    const bitrate = Math.round(((bytesNow - this.bytesPrev) * 8) /
                        (activeCandidatePair.timestamp - this.timestampPrev));
                    // this.bitrateDiv.innerHTML = `<strong>Current Bitrate:</strong> ${bitrate} kbits/sec`;
                    console.log(`<strong>Current Bitrate:</strong> ${bitrate} kbits/sec`);
                    this.timestampPrev = activeCandidatePair.timestamp;
                    this.bytesPrev = bytesNow;
                    if (bitrate > this.bitrateMax) {
                        this.bitrateMax = bitrate;
                    }
                }
            }
        });
    }
};
SignalingService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_3__["RxStompService"] }
];
SignalingService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root',
    })
], SignalingService);



/***/ }),

/***/ "cXiT":
/*!****************************************!*\
  !*** ./src/app/sender/sender.state.ts ***!
  \****************************************/
/*! exports provided: SenderState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderState", function() { return SenderState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! immer */ "rfrl");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../receiver/receiver.action */ "RhV3");
/* harmony import */ var _services_signaling_sender_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/signaling-sender.service */ "OODc");
/* harmony import */ var _sender_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sender.action */ "jSkY");








let SenderState = class SenderState {
    constructor(injector) {
        this.injector = injector;
        console.log('SenderState init');
    }
    /**
     * on state init
     * @param ctx
     */
    ngxsOnInit(ctx) {
        let localId = localStorage.getItem('localId');
        if (!localId) {
            localId = 'p' + Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v1"])().replace(/\-/g, '_');
            localStorage.setItem('localId', localId);
        }
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            draft.localId = localId;
        }));
    }
    initChanel(ctx, action) {
        const state = ctx.getState();
        this.signalingService = this.injector.get(_services_signaling_sender_service__WEBPACK_IMPORTED_MODULE_6__["SignalingSender"]);
        this.signalingService.setLocalIdAndStartListenMessage(state.localId);
        console.log('Action', action);
        this.setCurrentSate(ctx, new _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_5__["SetCurrentStepAction"](1));
        this.signalingService
            .initCoordinatorChanel({
            files: state.localFiles.map((file) => {
                return { fileId: file.fileId, totalPart: file.totalPart };
            }),
            peerId: state.localId,
        })
            .subscribe((res) => {
            if (res) {
                ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
                    draft.channelId = res.chanelId;
                    draft.accessKey = res.accessKey;
                }));
                this.setCurrentSate(ctx, new _receiver_receiver_action__WEBPACK_IMPORTED_MODULE_5__["SetCurrentStepAction"](2));
                this.signalingService.dataChannel$.subscribe((res) => {
                    if (res) {
                        this.signalingService.sendData(state.localFiles[0]);
                    }
                });
            }
        });
    }
    addFiles(ctx, action) {
        console.log('Action', action);
        ctx.setState(Object(immer__WEBPACK_IMPORTED_MODULE_3__["default"])((draft) => {
            if (draft.localFiles.length === 1 &&
                draft.localFiles[0].fileId === '-1') {
                draft.localFiles = [];
            }
            const files = [...draft.localFiles, ...action.files];
            draft.localFiles = files.slice(-3);
        }));
    }
    setCurrentSate(ctx, action) {
        const state = ctx.getState();
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
};
SenderState.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_sender_action__WEBPACK_IMPORTED_MODULE_7__["InitChanelAction"])
], SenderState.prototype, "initChanel", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_sender_action__WEBPACK_IMPORTED_MODULE_7__["AppendFilesAction"])
], SenderState.prototype, "addFiles", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_receiver_receiver_action__WEBPACK_IMPORTED_MODULE_5__["SetCurrentStepAction"])
], SenderState.prototype, "setCurrentSate", null);
SenderState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'senderState',
        defaults: {
            localId: '',
            peerId: '',
            localFiles: [],
            peerFiles: [],
            steps: [
                { state: 'normal', disable: false, name: 'Ready' },
                { state: 'normal', disable: true, name: 'Initialize' },
                { state: 'normal', disable: true, name: 'Seeding' },
            ],
            currentStep: -1,
        },
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], SenderState);



/***/ }),

/***/ "jSkY":
/*!*****************************************!*\
  !*** ./src/app/sender/sender.action.ts ***!
  \*****************************************/
/*! exports provided: InitChanelAction, AppendFilesAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitChanelAction", function() { return InitChanelAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppendFilesAction", function() { return AppendFilesAction; });
class InitChanelAction {
    constructor() { }
}
InitChanelAction.type = 'Init chanel';
class AppendFilesAction {
    constructor(files) {
        this.files = files;
    }
}
AppendFilesAction.type = 'add file action';


/***/ }),

/***/ "phrQ":
/*!********************************************!*\
  !*** ./src/app/sender/sender.selectors.ts ***!
  \********************************************/
/*! exports provided: SenderSelectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderSelectors", function() { return SenderSelectors; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _sender_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sender.state */ "cXiT");



class SenderSelectors {
    static isReadyToSend(state) {
        return !!state.channelId && !!state.accessKey;
    }
    static localId(state) {
        return state.localId;
    }
    static steps(state) {
        return state.steps;
    }
    static currentStep(state) {
        return state.currentStep;
    }
    static channelId(state) {
        return state.channelId;
    }
    static accessKey(state) {
        return state.accessKey;
    }
    static localFiles(state) {
        return state.localFiles.filter((file) => file.fileId !== '-1');
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "isReadyToSend", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "localId", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "steps", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "currentStep", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "channelId", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "accessKey", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])([_sender_state__WEBPACK_IMPORTED_MODULE_2__["SenderState"]])
], SenderSelectors, "localFiles", null);


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



const routes = [
    {
        path: 'receiver',
        loadChildren: () => Promise.all(/*! import() | receiver-receiver-module */[__webpack_require__.e("default~receiver-receiver-module~sender-sender-module"), __webpack_require__.e("receiver-receiver-module")]).then(__webpack_require__.bind(null, /*! ./receiver/receiver.module */ "pQ7I")).then((m) => m.ReceiverModule),
    },
    {
        path: '**',
        loadChildren: () => Promise.all(/*! import() | sender-sender-module */[__webpack_require__.e("default~receiver-receiver-module~sender-sender-module"), __webpack_require__.e("sender-sender-module")]).then(__webpack_require__.bind(null, /*! ./sender/sender.module */ "2iOY")).then((m) => m.SenderModule),
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AppRoutingModule);



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".e1_2 {\n  overflow: hidden;\n}\n\n.e1_2 {\n  min-width: 1440px;\n  min-height: 850px;\n  left: 50%;\n  transform: translate(-50%, 0);\n  position: absolute;\n}\n\n.e3_20 {\n  width: 1002px;\n  height: 559px;\n  position: absolute;\n  left: 235px;\n  top: 232px;\n}\n\n.e1_3 {\n  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);\n  background-color: white;\n  width: 1002px;\n  height: 559px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  border-top-left-radius: 43px;\n  border-top-right-radius: 43px;\n  border-bottom-left-radius: 43px;\n  border-bottom-right-radius: 43px;\n}\n\n.e2_21 {\n  width: 356px;\n  height: 358px;\n  position: absolute;\n  left: 38px;\n  top: 100px;\n}\n\n.e1_8 {\n  background-color: #e0e1fb8c;\n  width: 356px;\n  height: 358px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  border-top-left-radius: 15px;\n  border-top-right-radius: 15px;\n  border-bottom-left-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n\n.e2_22 {\n  width: 246.9750213623px;\n  height: 251.3458404541px;\n  position: absolute;\n  left: 54.7692375183px;\n  top: 0px;\n  border-top-left-radius: 15px;\n  border-top-right-radius: 15px;\n  border-bottom-left-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n\n.e2_23 {\n  color: #626262;\n  width: 254.411895752px;\n  height: 34.4740905762px;\n  position: absolute;\n  left: 51.0000038147px;\n  top: 241.3185119629px;\n  font-family: Roboto;\n  text-align: center;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n\n.e2_25 {\n  width: 90px;\n  height: 35px;\n  position: absolute;\n  left: 133px;\n  top: 302px;\n}\n\n.ei2_25_1_15 {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);\n  background-color: #7f7ed9;\n  width: 90px !important;\n  height: 35px !important;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\n.i2_25_1_15 {\n  border: 1px solid #cccccc;\n}\n\n.e2_28 {\n  color: #626262;\n  width: 17px;\n  height: 21px;\n  position: absolute;\n  left: 170px;\n  top: 266px;\n  font-family: Roboto;\n  text-align: center;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e1_7 {\n  color: #626262;\n  width: 282px;\n  height: 27px;\n  position: absolute;\n  left: 0px;\n  top: -32px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 22px;\n  letter-spacing: 0;\n}\n\n.e1_20 {\n  width: 532px;\n  height: 89px;\n  position: absolute;\n  left: 433px;\n  top: 94px;\n}\n\n.e1_10 {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);\n  background-color: white;\n  width: 532px;\n  height: 75px;\n  position: absolute;\n  left: 0px;\n  top: 9px;\n  border-top-left-radius: 15px;\n  border-top-right-radius: 15px;\n  border-bottom-left-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n\n.e1_10 {\n  border: 1px solid #cccccc;\n}\n\n.e1_21 {\n  background-color: #c4c4c4;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  left: 9px;\n  top: 23px;\n  border-top-left-radius: 13px;\n  border-top-right-radius: 13px;\n  border-bottom-left-radius: 13px;\n  border-bottom-right-radius: 13px;\n}\n\n.e1_24 {\n  width: 409px;\n  height: 41.5333366394px;\n  position: absolute;\n  left: 81px;\n  top: 23px;\n}\n\n.e1_22 {\n  color: #626262;\n  width: 397.6389160156px;\n  height: 25.4285697937px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n\n.e1_23 {\n  background-color: #8cb8f4;\n  width: 409px;\n  height: 5.9333343506px;\n  position: absolute;\n  left: 0px;\n  top: 35.6000022888px;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n}\n\n.e104_1 {\n  width: 20.0000038147px !important;\n  height: 20.000005722px !important;\n  position: absolute;\n  left: 506px;\n  top: 16px;\n}\n\n.e1_33 {\n  width: 532px;\n  height: 88px;\n  position: absolute;\n  left: 433px;\n  top: 196px;\n}\n\n.ei1_33_1_10 {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);\n  background-color: white;\n  width: 532px;\n  height: 74.1573028564px;\n  position: absolute;\n  left: 0px;\n  top: 8.8988761902px;\n  border-top-left-radius: 15px;\n  border-top-right-radius: 15px;\n  border-bottom-left-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n\n.i1_33_1_10 {\n  border: 1px solid #cccccc;\n}\n\n.ei1_33_1_21 {\n  background-color: #c4c4c4;\n  width: 50px;\n  height: 49.4381980896px;\n  position: absolute;\n  left: 9px;\n  top: 22.7415733337px;\n  border-top-left-radius: 13px;\n  border-top-right-radius: 13px;\n  border-bottom-left-radius: 13px;\n  border-bottom-right-radius: 13px;\n}\n\n.ei1_33_1_24 {\n  width: 409px;\n  height: 41.0666694641px;\n  position: absolute;\n  left: 81px;\n  top: 22.7415733337px;\n}\n\n.ei1_33_1_22 {\n  color: #626262;\n  width: 397.6389160156px;\n  height: 25.1428565979px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n\n.ei1_33_1_23 {\n  background-color: #8cb8f4;\n  width: 409px;\n  height: 5.8666687012px;\n  position: absolute;\n  left: 0px;\n  top: 35.2000007629px;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n}\n\n.ei1_33_104_1 {\n  width: 20px !important;\n  height: 19.7752876282px !important;\n  position: absolute;\n  left: 506px;\n  top: 15.820224762px;\n}\n\n.e1_42 {\n  width: 532px;\n  height: 89px;\n  position: absolute;\n  left: 433px;\n  top: 298px;\n}\n\n.ei1_42_1_10 {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);\n  background-color: white;\n  width: 532px;\n  height: 75px;\n  position: absolute;\n  left: 0px;\n  top: 9px;\n  border-top-left-radius: 15px;\n  border-top-right-radius: 15px;\n  border-bottom-left-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n\n.i1_42_1_10 {\n  border: 1px solid #cccccc;\n}\n\n.ei1_42_1_21 {\n  background-color: #c4c4c4;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  left: 9px;\n  top: 23px;\n  border-top-left-radius: 13px;\n  border-top-right-radius: 13px;\n  border-bottom-left-radius: 13px;\n  border-bottom-right-radius: 13px;\n}\n\n.ei1_42_1_24 {\n  width: 409px;\n  height: 41.5333366394px;\n  position: absolute;\n  left: 81px;\n  top: 23px;\n}\n\n.ei1_42_1_22 {\n  color: #626262;\n  width: 397.6389160156px;\n  height: 25.4285697937px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n\n.ei1_42_1_23 {\n  background-color: #8cb8f4;\n  width: 409px;\n  height: 5.9333343506px;\n  position: absolute;\n  left: 0px;\n  top: 35.6000022888px;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n}\n\n.ei1_42_104_1 {\n  width: 20.0000038147px !important;\n  height: 20.000005722px !important;\n  position: absolute;\n  left: 506px;\n  top: 16px;\n}\n\n.e1_52 {\n  color: #626262;\n  width: 40px;\n  height: 18px;\n  position: absolute;\n  left: 433px;\n  top: 409px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e1_54 {\n  color: #626262;\n  width: 250px;\n  height: 18px;\n  position: absolute;\n  left: 485px;\n  top: 434px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e103_20 {\n  color: #626262;\n  width: 250px;\n  height: 21px;\n  position: absolute;\n  left: 485px;\n  top: 409px;\n  font-family: Roboto;\n  text-align: justified;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e1_53 {\n  color: #626262;\n  width: 40px;\n  height: 18px;\n  position: absolute;\n  left: 433px;\n  top: 434px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e1_57 {\n  width: 208px;\n  height: 28px;\n  position: absolute;\n  left: 397px;\n  top: 13px;\n  line-height: 2rem;\n}\n\n.e1_59 {\n  color: #626262;\n  width: 94px;\n  height: 28px;\n  position: absolute;\n  left: 114px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 24px;\n  letter-spacing: 0;\n}\n\n.e1_56 {\n  color: #626262;\n  width: 77.1612930298px;\n  height: 24px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: right;\n  font-size: 24px;\n  letter-spacing: 0;\n}\n\n.e2_32 {\n  background-color: #626262;\n  width: 3px;\n  height: 25px;\n  position: absolute;\n  left: 92px;\n  top: 3px;\n}\n\n.e103_51 {\n  color: #626262;\n  width: 50px;\n  height: 21px;\n  position: absolute;\n  left: 0px;\n  top: 40px;\n  font-family: Roboto;\n  text-align: left;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e105_46 {\n  border-radius: 500px;\n  background-color: #c4c4c4;\n  width: auto;\n  height: 35px;\n  position: relative;\n  left: 7px;\n  top: 0px;\n}\n\n.e105_45 {\n  border-radius: 500px;\n  background-color: #c4c4c4;\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  left: 16px;\n  top: 0px;\n}\n\n.e103_55 {\n  color: #626262;\n  width: 66px;\n  height: 21px;\n  position: absolute;\n  left: 0px;\n  top: 40px;\n  font-family: Roboto;\n  text-align: center;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e103_57 {\n  border-radius: 500px;\n  background-color: #c4c4c4;\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  left: 13px;\n  top: 0px;\n}\n\n.e103_58 {\n  color: #626262;\n  width: 61px;\n  height: 21px;\n  position: absolute;\n  left: 0px;\n  top: 40px;\n  font-family: Roboto;\n  text-align: center;\n  font-size: 18px;\n  letter-spacing: 0;\n}\n\n.e105_69 {\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  left: 493px;\n  top: 272px;\n}\n\n.e103_61 {\n  color: white;\n  opacity: 0.6999999881;\n  width: 255px;\n  height: 23px;\n  position: absolute;\n  left: 982px;\n  top: 804px;\n  font-family: Roboto;\n  text-align: center;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n\n.e103_63 {\n  opacity: 0.8000000119;\n  width: 685px;\n  height: 116px;\n  position: absolute;\n  left: 377px;\n  top: 100px;\n}\n\n.e103_62 {\n  width: 251.3669586182px;\n  height: 116px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  background-image: url('f2f.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.e103_59 {\n  color: white;\n  width: 420.6140441895px;\n  height: 117px;\n  position: absolute;\n  left: 264.3859558105px;\n  top: 0px;\n  font-family: Roboto;\n  text-align: justified;\n  font-size: 24px;\n  letter-spacing: 0;\n}\n\n.e103_59 li {\n  height: 32px;\n  line-height: 1;\n}\n\n.e105_52 {\n  width: 94.3548355103px;\n  height: 40px;\n  position: absolute;\n  left: 943px;\n  top: 644px;\n}\n\n.e105_47 {\n  width: 40px !important;\n  height: 40px !important;\n  position: absolute !important;\n  left: 0px;\n  top: 0px;\n}\n\n.e105_60 {\n  width: 40px !important;\n  height: 40px !important;\n  position: absolute !important;\n  left: 64.3548355103px;\n  top: 0px;\n}\n\n.e2_28 {\n  width: 75px;\n  left: 141px;\n}\n\n.e103_20 {\n  top: 390px;\n}\n\n.e1_52 {\n  top: 396px;\n}\n\n.e1_54 {\n  top: 427px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsMkJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQ0FBQTtFQUNBLHlCQUFBO0VBTUEsc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFB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QkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0FBMURGOztBQTZEQTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSw2QkFBQTtFQUNBLHFCQUFBO0VBQ0EsUUFBQTtBQTFERjs7QUE2REE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtBQTFERjs7QUE2REE7RUFDRSxVQUFBO0FBMURGOztBQTZEQTtFQUNFLFVBQUE7QUExREY7O0FBNkRBO0VBQ0UsVUFBQTtBQTFERiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZTFfMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5lMV8yIHtcbiAgbWluLXdpZHRoOiAxNDQwcHg7XG4gIG1pbi1oZWlnaHQ6IDg1MHB4O1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5lM18yMCB7XG4gIHdpZHRoOiAxMDAycHg7XG4gIGhlaWdodDogNTU5cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMjM1cHg7XG4gIHRvcDogMjMycHg7XG59XG5cbi5lMV8zIHtcbiAgYm94LXNoYWRvdzogMHB4IDhweCA4cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcbiAgd2lkdGg6IDEwMDJweDtcbiAgaGVpZ2h0OiA1NTlweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0M3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNDNweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNDNweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDQzcHg7XG59XG5cbi5lMl8yMSB7XG4gIHdpZHRoOiAzNTZweDtcbiAgaGVpZ2h0OiAzNThweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAzOHB4O1xuICB0b3A6IDEwMHB4O1xufVxuXG4uZTFfOCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUxZmI4YztcbiAgd2lkdGg6IDM1NnB4O1xuICBoZWlnaHQ6IDM1OHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiAwcHg7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTVweDtcbn1cblxuLmUyXzIyIHtcbiAgd2lkdGg6IDI0Ni45NzUwMjEzNjIzMDQ3cHg7XG4gIGhlaWdodDogMjUxLjM0NTg0MDQ1NDEwMTU2cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTQuNzY5MjM3NTE4MzEwNTVweDtcbiAgdG9wOiAwcHg7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTVweDtcbn1cblxuLmUyXzIzIHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiAyNTQuNDExODk1NzUxOTUzMTJweDtcbiAgaGVpZ2h0OiAzNC40NzQwOTA1NzYxNzE4NzVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MS4wMDAwMDM4MTQ2OTcyNjZweDtcbiAgdG9wOiAyNDEuMzE4NTExOTYyODkwNjJweDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZTJfMjUge1xuICB3aWR0aDogOTBweDtcbiAgaGVpZ2h0OiAzNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDEzM3B4O1xuICB0b3A6IDMwMnB4O1xufVxuXG4uZWkyXzI1XzFfMTUge1xuICBib3gtc2hhZG93OiAwcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKFxyXG4gICAgMTI3LjAwMDAwMDAyOTgwMjMyLFxyXG4gICAgMTI2LjAwMDAwMDA4OTQwNjk3LFxyXG4gICAgMjE3LjAwMDAwMjI2NDk3NjUsXHJcbiAgICAxXHJcbiAgKTtcbiAgd2lkdGg6IDkwcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAzNXB4ICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xufVxuXG4uaTJfMjVfMV8xNSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkXHJcbiAgICByZ2JhKDIwNC4wMDAwMDMwMzk4MzY4OCwgMjA0LjAwMDAwMzAzOTgzNjg4LCAyMDQuMDAwMDAzMDM5ODM2ODgsIDEpO1xufVxuXG4uZTJfMjgge1xuICBjb2xvcjogcmdiYSg5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCAxKTtcbiAgd2lkdGg6IDE3cHg7XG4gIGhlaWdodDogMjFweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAxNzBweDtcbiAgdG9wOiAyNjZweDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZTFfNyB7XG4gIGNvbG9yOiByZ2JhKDk4LjI2NDY0OTk1NzQxODQ0LCA5OC4yNjQ2NDk5NTc0MTg0NCwgOTguMjY0NjQ5OTU3NDE4NDQsIDEpO1xuICB3aWR0aDogMjgycHg7XG4gIGhlaWdodDogMjdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogLTMycHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMV8yMCB7XG4gIHdpZHRoOiA1MzJweDtcbiAgaGVpZ2h0OiA4OXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDQzM3B4O1xuICB0b3A6IDk0cHg7XG59XG5cbi5lMV8xMCB7XG4gIGJveC1zaGFkb3c6IDBweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gIHdpZHRoOiA1MzJweDtcbiAgaGVpZ2h0OiA3NXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiA5cHg7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTVweDtcbn1cblxuLmUxXzEwIHtcbiAgYm9yZGVyOiAxcHggc29saWRcclxuICAgIHJnYmEoMjA0LjAwMDAwMzAzOTgzNjg4LCAyMDQuMDAwMDAzMDM5ODM2ODgsIDIwNC4wMDAwMDMwMzk4MzY4OCwgMSk7XG59XG5cbi5lMV8yMSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxXHJcbiAgKTtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA5cHg7XG4gIHRvcDogMjNweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTNweDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxM3B4O1xufVxuXG4uZTFfMjQge1xuICB3aWR0aDogNDA5cHg7XG4gIGhlaWdodDogNDEuNTMzMzM2NjM5NDA0M3B4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDgxcHg7XG4gIHRvcDogMjNweDtcbn1cblxuLmUxXzIyIHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiAzOTcuNjM4OTE2MDE1NjI1cHg7XG4gIGhlaWdodDogMjUuNDI4NTY5NzkzNzAxMTcycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDBweDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuLmUxXzIzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYShcclxuICAgIDE0MC4wMDAwMDY4NTQ1MzQxNSxcclxuICAgIDE4NC4wMDAwMDQyMzE5Mjk3OCxcclxuICAgIDI0NC4wMDAwMDA2NTU2NTExLFxyXG4gICAgMVxyXG4gICk7XG4gIHdpZHRoOiA0MDlweDtcbiAgaGVpZ2h0OiA1LjkzMzMzNDM1MDU4NTkzNzVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMzUuNjAwMDAyMjg4ODE4MzZweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XG59XG5cbi5lMTA0XzEge1xuICB3aWR0aDogMjAuMDAwMDAzODE0Njk3MjY2cHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAyMC4wMDAwMDU3MjIwNDU5cHggIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MDZweDtcbiAgdG9wOiAxNnB4O1xufVxuXG4uZTFfMzMge1xuICB3aWR0aDogNTMycHg7XG4gIGhlaWdodDogODhweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0MzNweDtcbiAgdG9wOiAxOTZweDtcbn1cblxuLmVpMV8zM18xXzEwIHtcbiAgYm94LXNoYWRvdzogMHB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcbiAgd2lkdGg6IDUzMnB4O1xuICBoZWlnaHQ6IDc0LjE1NzMwMjg1NjQ0NTMxcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDguODk4ODc2MTkwMTg1NTQ3cHg7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTVweDtcbn1cblxuLmkxXzMzXzFfMTAge1xuICBib3JkZXI6IDFweCBzb2xpZFxyXG4gICAgcmdiYSgyMDQuMDAwMDAzMDM5ODM2ODgsIDIwNC4wMDAwMDMwMzk4MzY4OCwgMjA0LjAwMDAwMzAzOTgzNjg4LCAxKTtcbn1cblxuLmVpMV8zM18xXzIxIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYShcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDFcclxuICApO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA0OS40MzgxOTgwODk1OTk2MXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDlweDtcbiAgdG9wOiAyMi43NDE1NzMzMzM3NDAyMzRweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTNweDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxM3B4O1xufVxuXG4uZWkxXzMzXzFfMjQge1xuICB3aWR0aDogNDA5cHg7XG4gIGhlaWdodDogNDEuMDY2NjY5NDY0MTExMzNweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA4MXB4O1xuICB0b3A6IDIyLjc0MTU3MzMzMzc0MDIzNHB4O1xufVxuXG4uZWkxXzMzXzFfMjIge1xuICBjb2xvcjogcmdiYSg5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCAxKTtcbiAgd2lkdGg6IDM5Ny42Mzg5MTYwMTU2MjVweDtcbiAgaGVpZ2h0OiAyNS4xNDI4NTY1OTc5MDAzOXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiAwcHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5laTFfMzNfMV8yMyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoXHJcbiAgICAxNDAuMDAwMDA2ODU0NTM0MTUsXHJcbiAgICAxODQuMDAwMDA0MjMxOTI5NzgsXHJcbiAgICAyNDQuMDAwMDAwNjU1NjUxMSxcclxuICAgIDFcclxuICApO1xuICB3aWR0aDogNDA5cHg7XG4gIGhlaWdodDogNS44NjY2Njg3MDExNzE4NzVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMzUuMjAwMDAwNzYyOTM5NDVweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XG59XG5cbi5laTFfMzNfMTA0XzEge1xuICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDE5Ljc3NTI4NzYyODE3MzgyOHB4ICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTA2cHg7XG4gIHRvcDogMTUuODIwMjI0NzYxOTYyODlweDtcbn1cblxuLmUxXzQyIHtcbiAgd2lkdGg6IDUzMnB4O1xuICBoZWlnaHQ6IDg5cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNDMzcHg7XG4gIHRvcDogMjk4cHg7XG59XG5cbi5laTFfNDJfMV8xMCB7XG4gIGJveC1zaGFkb3c6IDBweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gIHdpZHRoOiA1MzJweDtcbiAgaGVpZ2h0OiA3NXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiA5cHg7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTVweDtcbn1cblxuLmkxXzQyXzFfMTAge1xuICBib3JkZXI6IDFweCBzb2xpZFxyXG4gICAgcmdiYSgyMDQuMDAwMDAzMDM5ODM2ODgsIDIwNC4wMDAwMDMwMzk4MzY4OCwgMjA0LjAwMDAwMzAzOTgzNjg4LCAxKTtcbn1cblxuLmVpMV80Ml8xXzIxIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYShcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDFcclxuICApO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDlweDtcbiAgdG9wOiAyM3B4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTNweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTNweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEzcHg7XG59XG5cbi5laTFfNDJfMV8yNCB7XG4gIHdpZHRoOiA0MDlweDtcbiAgaGVpZ2h0OiA0MS41MzMzMzY2Mzk0MDQzcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogODFweDtcbiAgdG9wOiAyM3B4O1xufVxuXG4uZWkxXzQyXzFfMjIge1xuICBjb2xvcjogcmdiYSg5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCAxKTtcbiAgd2lkdGg6IDM5Ny42Mzg5MTYwMTU2MjVweDtcbiAgaGVpZ2h0OiAyNS40Mjg1Njk3OTM3MDExNzJweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IDIwcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZWkxXzQyXzFfMjMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKFxyXG4gICAgMTQwLjAwMDAwNjg1NDUzNDE1LFxyXG4gICAgMTg0LjAwMDAwNDIzMTkyOTc4LFxyXG4gICAgMjQ0LjAwMDAwMDY1NTY1MTEsXHJcbiAgICAxXHJcbiAgKTtcbiAgd2lkdGg6IDQwOXB4O1xuICBoZWlnaHQ6IDUuOTMzMzM0MzUwNTg1OTM3NXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiAzNS42MDAwMDIyODg4MTgzNnB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcbn1cblxuLmVpMV80Ml8xMDRfMSB7XG4gIHdpZHRoOiAyMC4wMDAwMDM4MTQ2OTcyNjZweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDIwLjAwMDAwNTcyMjA0NTlweCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwNnB4O1xuICB0b3A6IDE2cHg7XG59XG5cbi5lMV81MiB7XG4gIGNvbG9yOiByZ2JhKDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDEpO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDQzM3B4O1xuICB0b3A6IDQwOXB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZTFfNTQge1xuICBjb2xvcjogcmdiYSg5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCAxKTtcbiAgd2lkdGg6IDI1MHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNDg1cHg7XG4gIHRvcDogNDM0cHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMTAzXzIwIHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiAyNTBweDtcbiAgaGVpZ2h0OiAyMXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDQ4NXB4O1xuICB0b3A6IDQwOXB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBqdXN0aWZpZWQ7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMV81MyB7XG4gIGNvbG9yOiByZ2JhKDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDEpO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDQzM3B4O1xuICB0b3A6IDQzNHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZTFfNTcge1xuICB3aWR0aDogMjA4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAzOTdweDtcbiAgdG9wOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMnJlbTtcbn1cblxuLmUxXzU5IHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiA5NHB4O1xuICBoZWlnaHQ6IDI4cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTE0cHg7XG4gIHRvcDogMHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG4uZTFfNTYge1xuICBjb2xvcjogcmdiYSg5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCAxKTtcbiAgd2lkdGg6IDc3LjE2MTI5MzAyOTc4NTE2cHg7XG4gIGhlaWdodDogMjRweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuLmUyXzMyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYShcclxuICAgIDk4LjAwMDAwMTc1ODMzNzAyLFxyXG4gICAgOTguMDAwMDAxNzU4MzM3MDIsXHJcbiAgICA5OC4wMDAwMDE3NTgzMzcwMixcclxuICAgIDFcclxuICApO1xuICB3aWR0aDogM3B4O1xuICBoZWlnaHQ6IDI1cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogOTJweDtcbiAgdG9wOiAzcHg7XG59XG5cbi5lMTAzXzUxIHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDIxcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDQwcHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMTA1XzQ2IHtcbiAgYm9yZGVyLXJhZGl1czogNTAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxOTYuMDAwMDAzNTE2Njc0MDQsXHJcbiAgICAxXHJcbiAgKTtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMzVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiA3cHg7XG4gIHRvcDogMHB4O1xufVxuXG4uZTEwNV80NSB7XG4gIGJvcmRlci1yYWRpdXM6IDUwMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKFxyXG4gICAgMTk2LjAwMDAwMzUxNjY3NDA0LFxyXG4gICAgMTk2LjAwMDAwMzUxNjY3NDA0LFxyXG4gICAgMTk2LjAwMDAwMzUxNjY3NDA0LFxyXG4gICAgMVxyXG4gICk7XG4gIHdpZHRoOiAzNXB4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTZweDtcbiAgdG9wOiAwcHg7XG59XG5cbi5lMTAzXzU1IHtcbiAgY29sb3I6IHJnYmEoOTguMDAwMDAxNzU4MzM3MDIsIDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgMSk7XG4gIHdpZHRoOiA2NnB4O1xuICBoZWlnaHQ6IDIxcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDQwcHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuLmUxMDNfNTcge1xuICBib3JkZXItcmFkaXVzOiA1MDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYShcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDE5Ni4wMDAwMDM1MTY2NzQwNCxcclxuICAgIDFcclxuICApO1xuICB3aWR0aDogMzVweDtcbiAgaGVpZ2h0OiAzNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDEzcHg7XG4gIHRvcDogMHB4O1xufVxuXG4uZTEwM181OCB7XG4gIGNvbG9yOiByZ2JhKDk4LjAwMDAwMTc1ODMzNzAyLCA5OC4wMDAwMDE3NTgzMzcwMiwgOTguMDAwMDAxNzU4MzM3MDIsIDEpO1xuICB3aWR0aDogNjFweDtcbiAgaGVpZ2h0OiAyMXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiA0MHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMTA1XzY5IHtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0OTNweDtcbiAgdG9wOiAyNzJweDtcbn1cblxuLmUxMDNfNjEge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcbiAgb3BhY2l0eTogMC42OTk5OTk5ODgwNzkwNzE7XG4gIHdpZHRoOiAyNTVweDtcbiAgaGVpZ2h0OiAyM3B4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDk4MnB4O1xuICB0b3A6IDgwNHB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG5cbi5lMTAzXzYzIHtcbiAgb3BhY2l0eTogMC44MDAwMDAwMTE5MjA5Mjk7XG4gIHdpZHRoOiA2ODVweDtcbiAgaGVpZ2h0OiAxMTZweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAzNzdweDtcbiAgdG9wOiAxMDBweDtcbn1cblxuLmUxMDNfNjIge1xuICB3aWR0aDogMjUxLjM2Njk1ODYxODE2NDA2cHg7XG4gIGhlaWdodDogMTE2cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDBweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL2Fzc2V0cy9pbWFnZXMvZjJmLnBuZyk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbi5lMTAzXzU5IHtcbiAgY29sb3I6IHdoaXRlO1xuICB3aWR0aDogNDIwLjYxNDA0NDE4OTVweDtcbiAgaGVpZ2h0OiAxMTdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAyNjQuMzg1OTU1ODEwNXB4O1xuICB0b3A6IDBweDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgdGV4dC1hbGlnbjoganVzdGlmaWVkO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xuICBsaSB7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICB9XG59XG5cbi5lMTA1XzUyIHtcbiAgd2lkdGg6IDk0LjM1NDgzNTUxMDI1MzlweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDk0M3B4O1xuICB0b3A6IDY0NHB4O1xufVxuXG4uZTEwNV80NyB7XG4gIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDBweDtcbn1cblxuLmUxMDVfNjAge1xuICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XG4gIGxlZnQ6IDY0LjM1NDgzNTUxMDI1MzlweDtcbiAgdG9wOiAwcHg7XG59XG5cbi5lMl8yOHtcbiAgd2lkdGg6IDc1cHg7XG4gIGxlZnQ6IDE0MXB4O1xufVxuXG4uZTEwM18yMHtcbiAgdG9wOiAzOTBweDtcbn1cblxuLmUxXzUye1xuICB0b3A6IDM5NnB4O1xufVxuXG4uZTFfNTR7XG4gIHRvcDogNDI3cHg7XG59XHJcbiJdfQ== */");

/***/ }),

/***/ "z+ja":
/*!******************************!*\
  !*** ./src/app/app.state.ts ***!
  \******************************/
/*! exports provided: AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppState", function() { return AppState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");



let AppState = class AppState {
    constructor(store) {
        this.store = store;
    }
};
AppState.ctorParameters = () => [
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
AppState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'appState',
        defaults: {},
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppState);



/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map