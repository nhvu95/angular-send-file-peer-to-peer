(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~receiver-receiver-module~sender-sender-module"],{

/***/ "P3uQ":
/*!***********************************************************************************!*\
  !*** ./node_modules/ngxs-reset-plugin/__ivy_ngcc__/fesm2015/ngxs-reset-plugin.js ***!
  \***********************************************************************************/
/*! exports provided: NgxsResetPlugin, NgxsResetPluginModule, StateClear, StateOverwrite, StateReset, StateResetAll, getMetaData, ɵa, ɵb, ɵd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxsResetPlugin", function() { return NgxsResetPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxsResetPluginModule", function() { return NgxsResetPluginModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateClear", function() { return StateClear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateOverwrite", function() { return StateOverwrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateReset", function() { return StateReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateResetAll", function() { return StateResetAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMetaData", function() { return getMetaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return ResetService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return ResetHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return noop; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




/**
 * @fileoverview added by tsickle
 * Generated from: lib/internals.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */


function MetaDataModel() { }
if (false) {}
/**
 * a simplified implementation of NGXS StateClass interface
 * @record
 * @template T
 */
function StateClass() { }
if (false) {}
/**
 * @return {?}
 */
function noop() {
    return (/**
     * @return {?}
     */
    () => { });
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/reset.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResetService {
}
ResetService.ɵfac = function ResetService_Factory(t) { return new (t || ResetService)(); };
ResetService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ResetService, factory: ResetService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResetService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/reset.handler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResetHandler {
    /**
     * @param {?} actions$
     * @param {?} store
     * @param {?} resetService
     */
    constructor(actions$, store, resetService) {
        this.actions$ = actions$;
        this.store = store;
        this.resetService = resetService;
        this.actions$
            .pipe(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["ofActionSuccessful"])(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["InitState"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
            .subscribe((/**
         * @return {?}
         */
        () => (this.resetService.initialState = this.store.snapshot())));
        this.actions$.pipe(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["ofActionSuccessful"])(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["UpdateState"])).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ addedStates }) => (this.resetService.initialState = Object.assign(Object.assign({}, this.resetService.initialState), addedStates))));
    }
}
ResetHandler.ɵfac = function ResetHandler_Factory(t) { return new (t || ResetHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ResetService)); };
ResetHandler.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ResetHandler, factory: ResetHandler.ɵfac });
/** @nocollapse */
ResetHandler.ctorParameters = () => [
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Actions"] },
    { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Store"] },
    { type: ResetService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResetHandler, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Actions"] }, { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Store"] }, { type: ResetService }]; }, null); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/symbols.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Action to clear all state except given state(s)
 */
class StateClear {
    /**
     * @param {...?} statesToKeep
     */
    constructor(...statesToKeep) {
        /** @type {?} */
        const reducer = createMetaDataListReducer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])());
        this.statesToKeep = statesToKeep.reduce(reducer, []);
    }
}
StateClear.type = '@@CLEAR_STATE';
if (false) {}
/**
 * Action to reset given state(s) to defaults
 */
class StateReset {
    /**
     * @param {...?} statesToReset
     */
    constructor(...statesToReset) {
        /** @type {?} */
        const reducer = createMetaDataListReducer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])());
        this.statesToReset = statesToReset.reduce(reducer, []);
    }
}
StateReset.type = '@@RESET_STATE';
if (false) {}
/**
 * Action to reset all states expect given state(s) to defaults
 */
class StateResetAll {
    /**
     * @param {...?} statesToKeep
     */
    constructor(...statesToKeep) {
        /** @type {?} */
        const reducer = createMetaDataListReducer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])());
        this.statesToKeep = statesToKeep.reduce(reducer, []);
    }
}
StateResetAll.type = '@@RESET_STATE_ALL';
if (false) {}
/**
 * Action to overwrite state(s) with given value(s)
 */
class StateOverwrite {
    /**
     * @param {...?} overwriteConfigs
     */
    constructor(...overwriteConfigs) {
        /** @type {?} */
        const reducer = createMetaTupleReducer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])());
        const [states, values] = overwriteConfigs.reduce(reducer, [
            [],
            [],
        ]);
        this.statesToOverwrite = states;
        this.values = values;
    }
}
StateOverwrite.type = '@@OVERWRITE_STATE';
if (false) {}
/**
 * @param {?} state
 * @param {?} devMode
 * @return {?}
 */
function getMetaData(state, devMode) {
    /** @type {?} */
    const meta = (/** @type {?} */ (new Object(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["getStoreMetadata"])((/** @type {?} */ (state))))));
    /** @type {?} */
    const isNgxsMeta = meta.name && 'defaults' in meta;
    // Reusability Hack: devMode is number on purpose
    if (!isNgxsMeta && devMode === -2) {
        console.warn(`Reset Plugin Warning: ${meta.name} is not a state class.`);
        return null;
    }
    return meta;
}
/**
 * @param {?} devMode
 * @return {?}
 */
function createMetaDataListReducer(devMode) {
    return (/**
     * @param {?} acc
     * @param {?} state
     * @return {?}
     */
    (acc, state) => {
        // tslint:disable-next-line:no-bitwise
        /** @type {?} */
        const meta = getMetaData(state, ~devMode);
        return meta ? acc.concat(meta) : acc;
    });
}
/**
 * @param {?} devMode
 * @return {?}
 */
function createMetaTupleReducer(devMode) {
    return (/**
     * @param {?} acc
     * @param {?} __1
     * @return {?}
     */
    (acc, [state, value]) => {
        // tslint:disable-next-line:no-bitwise
        /** @type {?} */
        const meta = getMetaData(state, ~devMode);
        return meta ? [acc[0].concat(meta), acc[1].concat(value)] : acc;
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/reset.plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxsResetPlugin {
    /**
     * @param {?} resetService
     */
    constructor(resetService) {
        this.resetService = resetService;
    }
    /**
     * @private
     * @param {?} state
     * @param {?} statesToKeep
     * @return {?}
     */
    clearStates(state, statesToKeep) {
        return statesToKeep.reduce((/**
         * @param {?} obj
         * @param {?} meta
         * @return {?}
         */
        (obj, meta) => {
            /** @type {?} */
            const path = getPath(meta);
            if (!path) {
                return obj;
            }
            /** @type {?} */
            const parts = path.split('.');
            /** @type {?} */
            const value = Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["getValue"])(state, path);
            return parts.reduceRight((/**
             * @param {?} acc
             * @param {?} part
             * @return {?}
             */
            (acc, part) => part in obj
                ? {
                    [part]: Object.assign(Object.assign({}, obj[part]), acc),
                }
                : { [part]: acc }), value);
        }), {});
    }
    /**
     * @private
     * @param {?} state
     * @param {?} statesToOverwrite
     * @param {?} values
     * @return {?}
     */
    overwriteStates(state, statesToOverwrite, values) {
        statesToOverwrite.forEach((/**
         * @param {?} meta
         * @param {?} index
         * @return {?}
         */
        (meta, index) => {
            /** @type {?} */
            const path = getPath(meta);
            if (!path) {
                return;
            }
            state = Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["setValue"])(state, path, values[index]);
        }));
        return state;
    }
    /**
     * @private
     * @param {?} state
     * @param {?} statesToReset
     * @return {?}
     */
    resetStates(state, statesToReset) {
        statesToReset.forEach((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => {
            /** @type {?} */
            const path = getPath(meta);
            if (!path) {
                return;
            }
            state = Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["setValue"])(state, path, typeof meta.defaults === 'undefined' ? {} : meta.defaults);
            if (meta.children) {
                state = this.resetStates(state, (/** @type {?} */ (meta.children.map(getMetaData))));
            }
        }));
        return state;
    }
    /**
     * @private
     * @param {?} state
     * @param {?} statesToKeep
     * @return {?}
     */
    resetStatesAll(state, statesToKeep) {
        const [metas, values] = statesToKeep.reduce((/**
         * @param {?} acc
         * @param {?} meta
         * @return {?}
         */
        (acc, meta) => {
            /** @type {?} */
            const path = getPath(meta);
            if (!path) {
                return acc;
            }
            acc[0].push(meta);
            acc[1].push(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["getValue"])(state, path));
            return acc;
        }), [[], []]);
        return this.overwriteStates(this.resetService.initialState, metas, values);
    }
    /**
     * @param {?} state
     * @param {?} action
     * @param {?} next
     * @return {?}
     */
    handle(state, action, next) {
        /** @type {?} */
        const type = Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["getActionTypeFromInstance"])(action);
        switch (type) {
            case StateClear.type:
                state = this.clearStates(state, ((/** @type {?} */ (action))).statesToKeep);
                break;
            case StateReset.type:
                state = this.resetStates(state, ((/** @type {?} */ (action))).statesToReset);
                break;
            case StateResetAll.type:
                state = this.resetStatesAll(state, ((/** @type {?} */ (action))).statesToKeep);
                break;
            case StateOverwrite.type:
                const { statesToOverwrite, values } = (/** @type {?} */ (action));
                state = this.overwriteStates(state, statesToOverwrite, values);
                break;
            default:
                break;
        }
        return next(state, action);
    }
}
NgxsResetPlugin.ɵfac = function NgxsResetPlugin_Factory(t) { return new (t || NgxsResetPlugin)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ResetService)); };
NgxsResetPlugin.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NgxsResetPlugin, factory: NgxsResetPlugin.ɵfac });
/** @nocollapse */
NgxsResetPlugin.ctorParameters = () => [
    { type: ResetService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxsResetPlugin, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: ResetService }]; }, null); })();
if (false) {}
/**
 * @param {?} meta
 * @return {?}
 */
function getPath(meta) {
    return meta.path;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/reset.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxsResetPluginModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxsResetPluginModule,
            providers: [
                ResetService,
                ResetHandler,
                {
                    provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"],
                    useFactory: noop,
                    deps: [ResetHandler],
                    multi: true,
                },
                {
                    provide: _ngxs_store__WEBPACK_IMPORTED_MODULE_1__["NGXS_PLUGINS"],
                    useClass: NgxsResetPlugin,
                    multi: true,
                },
            ],
        };
    }
}
NgxsResetPluginModule.ɵfac = function NgxsResetPluginModule_Factory(t) { return new (t || NgxsResetPluginModule)(); };
NgxsResetPluginModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgxsResetPluginModule });
NgxsResetPluginModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxsResetPluginModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngxs-reset-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngxs-reset-plugin.js.map

/***/ }),

/***/ "gfTr":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-file-drop/__ivy_ngcc__/fesm2015/ngx-file-drop.js ***!
  \***************************************************************************/
/*! exports provided: NgxFileDropComponent, NgxFileDropContentTemplateDirective, NgxFileDropEntry, NgxFileDropModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFileDropComponent", function() { return NgxFileDropComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFileDropContentTemplateDirective", function() { return NgxFileDropContentTemplateDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFileDropEntry", function() { return NgxFileDropEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFileDropModule", function() { return NgxFileDropModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




/**
 * fileEntry is an instance of {@link FileSystemFileEntry} or {@link FileSystemDirectoryEntry}.
 * Which one is it can be checked using {@link FileSystemEntry.isFile} or {@link FileSystemEntry.isDirectory}
 * properties of the given {@link FileSystemEntry}.
 */



const _c0 = ["fileSelector"];
function NgxFileDropComponent_ng_template_4_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4.dropZoneLabel);
} }
function NgxFileDropComponent_ng_template_4_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxFileDropComponent_ng_template_4_div_1_Template_input_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.openFileSelector($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r5.browseBtnLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("className", ctx_r5.browseBtnClassName);
} }
function NgxFileDropComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NgxFileDropComponent_ng_template_4_div_0_Template, 2, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxFileDropComponent_ng_template_4_div_1_Template, 2, 2, "div", 7);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.dropZoneLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.showBrowseBtn);
} }
function NgxFileDropComponent_ng_template_6_Template(rf, ctx) { }
const _c1 = function (a0) { return { openFileSelector: a0 }; };
class NgxFileDropEntry {
    constructor(relativePath, fileEntry) {
        this.relativePath = relativePath;
        this.fileEntry = fileEntry;
    }
}

class NgxFileDropContentTemplateDirective {
    constructor(template) {
        this.template = template;
    }
}
NgxFileDropContentTemplateDirective.ɵfac = function NgxFileDropContentTemplateDirective_Factory(t) { return new (t || NgxFileDropContentTemplateDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])); };
NgxFileDropContentTemplateDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: NgxFileDropContentTemplateDirective, selectors: [["", "ngx-file-drop-content-tmp", ""]] });
NgxFileDropContentTemplateDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxFileDropContentTemplateDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{ selector: '[ngx-file-drop-content-tmp]' }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] }]; }, null); })();

class NgxFileDropComponent {
    constructor(zone, renderer) {
        this.zone = zone;
        this.renderer = renderer;
        this.accept = '*';
        this.directory = false;
        this.multiple = true;
        this.dropZoneLabel = '';
        this.dropZoneClassName = 'ngx-file-drop__drop-zone';
        this.useDragEnter = false;
        this.contentClassName = 'ngx-file-drop__content';
        this.showBrowseBtn = false;
        this.browseBtnClassName = 'btn btn-primary btn-xs ngx-file-drop__browse-btn';
        this.browseBtnLabel = 'Browse files';
        this.onFileDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onFileOver = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onFileLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isDraggingOverDropZone = false;
        this.globalDraggingInProgress = false;
        this.files = [];
        this.numOfActiveReadEntries = 0;
        this.helperFormEl = null;
        this.fileInputPlaceholderEl = null;
        this.dropEventTimerSubscription = null;
        this._disabled = false;
        this.openFileSelector = (event) => {
            if (this.fileSelector && this.fileSelector.nativeElement) {
                this.fileSelector.nativeElement.click();
            }
        };
        this.globalDragStartListener = this.renderer.listen('document', 'dragstart', (evt) => {
            this.globalDraggingInProgress = true;
        });
        this.globalDragEndListener = this.renderer.listen('document', 'dragend', (evt) => {
            this.globalDraggingInProgress = false;
        });
    }
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = (value != null && `${value}` !== 'false');
    }
    ngOnDestroy() {
        if (this.dropEventTimerSubscription) {
            this.dropEventTimerSubscription.unsubscribe();
            this.dropEventTimerSubscription = null;
        }
        this.globalDragStartListener();
        this.globalDragEndListener();
        this.files = [];
        this.helperFormEl = null;
        this.fileInputPlaceholderEl = null;
    }
    onDragOver(event) {
        if (this.useDragEnter) {
            this.preventAndStop(event);
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'copy';
            }
        }
        else if (!this.isDropzoneDisabled() && !this.useDragEnter && event.dataTransfer) {
            if (!this.isDraggingOverDropZone) {
                this.isDraggingOverDropZone = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
            event.dataTransfer.dropEffect = 'copy';
        }
    }
    onDragEnter(event) {
        if (!this.isDropzoneDisabled() && this.useDragEnter) {
            if (!this.isDraggingOverDropZone) {
                this.isDraggingOverDropZone = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
        }
    }
    onDragLeave(event) {
        if (!this.isDropzoneDisabled()) {
            if (this.isDraggingOverDropZone) {
                this.isDraggingOverDropZone = false;
                this.onFileLeave.emit(event);
            }
            this.preventAndStop(event);
        }
    }
    dropFiles(event) {
        if (!this.isDropzoneDisabled()) {
            this.isDraggingOverDropZone = false;
            if (event.dataTransfer) {
                let items;
                if (event.dataTransfer.items) {
                    items = event.dataTransfer.items;
                }
                else {
                    items = event.dataTransfer.files;
                }
                this.preventAndStop(event);
                this.checkFiles(items);
            }
        }
    }
    /**
     * Processes the change event of the file input and adds the given files.
     * @param Event event
     */
    uploadFiles(event) {
        if (!this.isDropzoneDisabled()) {
            if (event.target) {
                const items = event.target.files || [];
                this.checkFiles(items);
                this.resetFileInput();
            }
        }
    }
    checkFiles(items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let entry = null;
            if (this.canGetAsEntry(item)) {
                entry = item.webkitGetAsEntry();
            }
            if (!entry) {
                if (item) {
                    const fakeFileEntry = {
                        name: item.name,
                        isDirectory: false,
                        isFile: true,
                        file: (callback) => callback(item),
                    };
                    const toUpload = new NgxFileDropEntry(fakeFileEntry.name, fakeFileEntry);
                    this.addToQueue(toUpload);
                }
            }
            else {
                if (entry.isFile) {
                    const toUpload = new NgxFileDropEntry(entry.name, entry);
                    this.addToQueue(toUpload);
                }
                else if (entry.isDirectory) {
                    this.traverseFileTree(entry, entry.name);
                }
            }
        }
        if (this.dropEventTimerSubscription) {
            this.dropEventTimerSubscription.unsubscribe();
        }
        this.dropEventTimerSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(200, 200)
            .subscribe(() => {
            if (this.files.length > 0 && this.numOfActiveReadEntries === 0) {
                const files = this.files;
                this.files = [];
                this.onFileDrop.emit(files);
            }
        });
    }
    traverseFileTree(item, path) {
        if (item.isFile) {
            const toUpload = new NgxFileDropEntry(path, item);
            this.files.push(toUpload);
        }
        else {
            path = path + '/';
            const dirReader = item.createReader();
            let entries = [];
            const readEntries = () => {
                this.numOfActiveReadEntries++;
                dirReader.readEntries((result) => {
                    if (!result.length) {
                        // add empty folders
                        if (entries.length === 0) {
                            const toUpload = new NgxFileDropEntry(path, item);
                            this.zone.run(() => {
                                this.addToQueue(toUpload);
                            });
                        }
                        else {
                            for (let i = 0; i < entries.length; i++) {
                                this.zone.run(() => {
                                    this.traverseFileTree(entries[i], path + entries[i].name);
                                });
                            }
                        }
                    }
                    else {
                        // continue with the reading
                        entries = entries.concat(result);
                        readEntries();
                    }
                    this.numOfActiveReadEntries--;
                });
            };
            readEntries();
        }
    }
    /**
     * Clears any added files from the file input element so the same file can subsequently be added multiple times.
     */
    resetFileInput() {
        if (this.fileSelector && this.fileSelector.nativeElement) {
            const fileInputEl = this.fileSelector.nativeElement;
            const fileInputContainerEl = fileInputEl.parentElement;
            const helperFormEl = this.getHelperFormElement();
            const fileInputPlaceholderEl = this.getFileInputPlaceholderElement();
            // Just a quick check so we do not mess up the DOM (will never happen though).
            if (fileInputContainerEl !== helperFormEl) {
                // Insert the form input placeholder in the DOM before the form input element.
                this.renderer.insertBefore(fileInputContainerEl, fileInputPlaceholderEl, fileInputEl);
                // Add the form input as child of the temporary form element, removing the form input from the DOM.
                this.renderer.appendChild(helperFormEl, fileInputEl);
                // Reset the form, thus clearing the input element of any files.
                helperFormEl.reset();
                // Add the file input back to the DOM in place of the file input placeholder element.
                this.renderer.insertBefore(fileInputContainerEl, fileInputEl, fileInputPlaceholderEl);
                // Remove the input placeholder from the DOM
                this.renderer.removeChild(fileInputContainerEl, fileInputPlaceholderEl);
            }
        }
    }
    /**
     * Get a cached HTML form element as a helper element to clear the file input element.
     */
    getHelperFormElement() {
        if (!this.helperFormEl) {
            this.helperFormEl = this.renderer.createElement('form');
        }
        return this.helperFormEl;
    }
    /**
     * Get a cached HTML div element to be used as placeholder for the file input element when clearing said element.
     */
    getFileInputPlaceholderElement() {
        if (!this.fileInputPlaceholderEl) {
            this.fileInputPlaceholderEl = this.renderer.createElement('div');
        }
        return this.fileInputPlaceholderEl;
    }
    canGetAsEntry(item) {
        return !!item.webkitGetAsEntry;
    }
    isDropzoneDisabled() {
        return (this.globalDraggingInProgress || this.disabled);
    }
    addToQueue(item) {
        this.files.push(item);
    }
    preventAndStop(event) {
        event.stopPropagation();
        event.preventDefault();
    }
}
NgxFileDropComponent.ɵfac = function NgxFileDropComponent_Factory(t) { return new (t || NgxFileDropComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"])); };
NgxFileDropComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NgxFileDropComponent, selectors: [["ngx-file-drop"]], contentQueries: function NgxFileDropComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, NgxFileDropContentTemplateDirective, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.contentTemplate = _t.first);
    } }, viewQuery: function NgxFileDropComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.fileSelector = _t.first);
    } }, inputs: { accept: "accept", directory: "directory", multiple: "multiple", dropZoneLabel: "dropZoneLabel", dropZoneClassName: "dropZoneClassName", useDragEnter: "useDragEnter", contentClassName: "contentClassName", showBrowseBtn: "showBrowseBtn", browseBtnClassName: "browseBtnClassName", browseBtnLabel: "browseBtnLabel", disabled: "disabled" }, outputs: { onFileDrop: "onFileDrop", onFileOver: "onFileOver", onFileLeave: "onFileLeave" }, decls: 7, vars: 15, consts: [[3, "className", "drop", "dragover", "dragenter", "dragleave"], [3, "className"], ["type", "file", 1, "ngx-file-drop__file-input", 3, "accept", "multiple", "change"], ["fileSelector", ""], ["defaultContentTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "ngx-file-drop__drop-zone-label", 4, "ngIf"], [4, "ngIf"], [1, "ngx-file-drop__drop-zone-label"], ["type", "button", 3, "className", "value", "click"]], template: function NgxFileDropComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("drop", function NgxFileDropComponent_Template_div_drop_0_listener($event) { return ctx.dropFiles($event); })("dragover", function NgxFileDropComponent_Template_div_dragover_0_listener($event) { return ctx.onDragOver($event); })("dragenter", function NgxFileDropComponent_Template_div_dragenter_0_listener($event) { return ctx.onDragEnter($event); })("dragleave", function NgxFileDropComponent_Template_div_dragleave_0_listener($event) { return ctx.onDragLeave($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function NgxFileDropComponent_Template_input_change_2_listener($event) { return ctx.uploadFiles($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, NgxFileDropComponent_ng_template_4_Template, 2, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, NgxFileDropComponent_ng_template_6_Template, 0, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ngx-file-drop__drop-zone--over", ctx.isDraggingOverDropZone);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("className", ctx.dropZoneClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("className", ctx.contentClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("accept", ctx.accept)("multiple", ctx.multiple);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("directory", ctx.directory || undefined)("webkitdirectory", ctx.directory || undefined)("mozdirectory", ctx.directory || undefined)("msdirectory", ctx.directory || undefined)("odirectory", ctx.directory || undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.contentTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](13, _c1, ctx.openFileSelector));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgTemplateOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: [".ngx-file-drop__drop-zone[_ngcontent-%COMP%]{border:2px dotted #0782d0;border-radius:30px;height:100px;margin:auto}.ngx-file-drop__drop-zone--over[_ngcontent-%COMP%]{background-color:hsla(0,0%,57.6%,.5)}.ngx-file-drop__content[_ngcontent-%COMP%]{align-items:center;color:#0782d0;display:flex;height:100px;justify-content:center}.ngx-file-drop__drop-zone-label[_ngcontent-%COMP%]{text-align:center}.ngx-file-drop__file-input[_ngcontent-%COMP%]{display:none}"] });
NgxFileDropComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
];
NgxFileDropComponent.propDecorators = {
    accept: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    directory: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    multiple: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    dropZoneLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    dropZoneClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    useDragEnter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    contentClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    showBrowseBtn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    browseBtnClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    browseBtnLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    onFileDrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    onFileOver: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    onFileLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    contentTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"], args: [NgxFileDropContentTemplateDirective, { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] },] }],
    fileSelector: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['fileSelector', { static: true },] }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxFileDropComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-file-drop',
                template: "<div [className]=\"dropZoneClassName\"\r\n     [class.ngx-file-drop__drop-zone--over]=\"isDraggingOverDropZone\"\r\n     (drop)=\"dropFiles($event)\"\r\n     (dragover)=\"onDragOver($event)\"\r\n     (dragenter)=\"onDragEnter($event)\"\r\n     (dragleave)=\"onDragLeave($event)\">\r\n  <div [className]=\"contentClassName\">\r\n    <input \r\n      type=\"file\" \r\n      #fileSelector \r\n      [accept]=\"accept\" \r\n      [attr.directory]=\"directory || undefined\" \r\n      [attr.webkitdirectory]=\"directory || undefined\"\r\n      [attr.mozdirectory]=\"directory || undefined\"\r\n      [attr.msdirectory]=\"directory || undefined\"\r\n      [attr.odirectory]=\"directory || undefined\"\r\n      [multiple]=\"multiple\"\r\n      (change)=\"uploadFiles($event)\" \r\n      class=\"ngx-file-drop__file-input\" \r\n    />\r\n\r\n    <ng-template #defaultContentTemplate>\r\n      <div *ngIf=\"dropZoneLabel\" class=\"ngx-file-drop__drop-zone-label\">{{dropZoneLabel}}</div>\r\n      <div *ngIf=\"showBrowseBtn\">\r\n        <input type=\"button\" [className]=\"browseBtnClassName\" value=\"{{browseBtnLabel}}\" (click)=\"openFileSelector($event)\" />\r\n      </div>\r\n    </ng-template>\r\n\r\n    <ng-template\r\n      [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\r\n      [ngTemplateOutletContext]=\"{ openFileSelector: openFileSelector }\">\r\n    </ng-template>\r\n  </div>\r\n</div>\r\n",
                styles: [".ngx-file-drop__drop-zone{border:2px dotted #0782d0;border-radius:30px;height:100px;margin:auto}.ngx-file-drop__drop-zone--over{background-color:hsla(0,0%,57.6%,.5)}.ngx-file-drop__content{align-items:center;color:#0782d0;display:flex;height:100px;justify-content:center}.ngx-file-drop__drop-zone-label{text-align:center}.ngx-file-drop__file-input{display:none}"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }]; }, { accept: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], directory: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], multiple: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], dropZoneLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], dropZoneClassName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], useDragEnter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], contentClassName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], showBrowseBtn: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], browseBtnClassName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], browseBtnLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], onFileDrop: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onFileOver: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onFileLeave: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], contentTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
            args: [NgxFileDropContentTemplateDirective, { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] }]
        }], fileSelector: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['fileSelector', { static: true }]
        }] }); })();

class NgxFileDropModule {
}
NgxFileDropModule.ɵfac = function NgxFileDropModule_Factory(t) { return new (t || NgxFileDropModule)(); };
NgxFileDropModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgxFileDropModule, bootstrap: function () { return [NgxFileDropComponent]; } });
NgxFileDropModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxFileDropModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    NgxFileDropComponent,
                    NgxFileDropContentTemplateDirective,
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                ],
                exports: [
                    NgxFileDropComponent,
                    NgxFileDropContentTemplateDirective,
                ],
                providers: [],
                bootstrap: [
                    NgxFileDropComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NgxFileDropModule, { declarations: function () { return [NgxFileDropComponent, NgxFileDropContentTemplateDirective]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]; }, exports: function () { return [NgxFileDropComponent, NgxFileDropContentTemplateDirective]; } }); })();

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-file-drop.js.map

/***/ })

}]);
//# sourceMappingURL=default~receiver-receiver-module~sender-sender-module.js.map