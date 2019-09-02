var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var fs = require("fs");
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var tableCols = [
    "position",
    "points",
    "numero",
    "pilote",
    "pays",
    "team",
    "moto",
    "vitesse",
    "chrono"
];
var getMotoGP = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, results;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('getMotoGp');
                return [4 /*yield*/, getPages()];
            case 1:
                data = _a.sent();
                results = [];
                console.log(data);
                return [4 /*yield*/, asyncForEach(data, function (element, index) { return __awaiter(_this, void 0, void 0, function () {
                        var answer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getResults(element.ref, index)];
                                case 1:
                                    answer = _a.sent();
                                    results.push(answer);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                console.log(results);
                return [2 /*return*/];
        }
    });
}); };
var getResults = function (url, index) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url, {
                        waitUntil: "domcontentloaded"
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function (tableCols) {
                        var table = document.querySelector('div table');
                        var rows = table.querySelectorAll('tr');
                        var data = [];
                        rows.forEach(function (row, irow) {
                            // for each row.....
                            var cols = row.querySelectorAll('td');
                            if (cols) {
                                cols.forEach(function (col, icol) {
                                    data.push({ row: irow, col: tableCols[icol], cell: col.innerHTML });
                                });
                            }
                        });
                        return data;
                    }, tableCols)];
            case 4:
                data = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var getPages = function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                page.on('console', function (consoleObj) { return console.log(consoleObj.text()); });
                return [4 /*yield*/, page.goto("https://www.motogp.com/fr/calendar", {
                        waitUntil: "domcontentloaded"
                    })];
            case 3:
                _a.sent();
                console.log('getPages');
                return [4 /*yield*/, page.evaluate(function () {
                        var data = [];
                        var elements = document.getElementsByClassName("event_buttons");
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            var a = element.querySelector("a");
                            var classNames = element.classList;
                            if (a)
                                for (var i2 = 0, l = classNames.length; i2 < l; i2++) {
                                    if (/^ev_\d{1,2}$/.test(classNames[i2])) {
                                        data.push({ "class": classNames[i2], ref: a.href });
                                        console.log({ "class": classNames[i2], ref: a.href });
                                    }
                                }
                        }
                        return data;
                    })];
            case 4:
                data = _a.sent();
                console.log('fini');
                //fs.writeFileSync('fichier3.html', data);
                return [4 /*yield*/, browser.close()];
            case 5:
                //fs.writeFileSync('fichier3.html', data);
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
getMotoGP();
