"use strict";
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
exports.__esModule = true;
exports.CharacterDrawer = void 0;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var marvel_1 = require("../../pages/api/marvel");
exports.CharacterDrawer = function (props) {
    var _a, _b;
    var character = props.character, open = props.open, setOpen = props.setOpen;
    var _c = react_2.useState(false), loading = _c[0], setLoading = _c[1];
    var toast = react_1.useToast();
    var _d = react_2.useState([]), comics = _d[0], setComics = _d[1];
    var _e = react_1.useDisclosure({
        onClose: function () {
            setOpen(!open);
            setComics([]);
        },
        isOpen: open
    }), isOpen = _e.isOpen, onClose = _e.onClose;
    react_2.useEffect(function () {
        if (!isOpen) {
            return;
        }
        setLoading(true);
        var fatchComics = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, marvel_1["default"].get("/characters/" + character.id + "/comics", {
                                params: {
                                    orderBy: "onsaleDate",
                                    limit: 10
                                }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        setComics(data.data.results);
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        toast({
                            title: err_1.message,
                            status: "error",
                            position: "top-right"
                        });
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fatchComics();
    }, [character]);
    return (React.createElement(react_1.Drawer, { placement: "right", onClose: onClose, isOpen: isOpen, size: "xl" },
        React.createElement(react_1.DrawerOverlay, null),
        React.createElement(react_1.DrawerContent, null,
            React.createElement(react_1.DrawerCloseButton, { color: "white" }),
            React.createElement(react_1.DrawerHeader, { bg: "blackAlpha.900" },
                React.createElement(react_1.Center, null,
                    React.createElement("span", { className: "icon--svg icon--svg mvl-animated-logo", "aria-hidden": "true" },
                        React.createElement("svg", { width: "130", height: "52", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("rect", { fill: "#EC1D24", width: "100%", height: "100%" }),
                            React.createElement("path", { fill: "#FEFEFE", d: "M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z" }),
                            React.createElement("path", { fill: "#EC1D24", d: "M0 0h30v52H0z" }),
                            React.createElement("path", { fill: "#FEFEFE", d: "M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z" }))))),
            React.createElement(react_1.DrawerBody, null,
                React.createElement(react_1.SimpleGrid, { mt: 10, columns: { base: 1, md: 2 }, spacing: 10 },
                    React.createElement(react_1.Box, null,
                        React.createElement(react_1.Text, { fontSize: "2xl", fontWeight: "bold", borderBottom: "2px solid red" }, character === null || character === void 0 ? void 0 : character.name),
                        React.createElement(react_1.Text, { mt: 5 }, (character === null || character === void 0 ? void 0 : character.description) ? character === null || character === void 0 ? void 0 : character.description : "Nenhuma descrição deste heroi encontrada :(")),
                    React.createElement(react_1.Box, null,
                        React.createElement(react_1.Image, { src: ((_a = character === null || character === void 0 ? void 0 : character.thumbnail) === null || _a === void 0 ? void 0 : _a.path) + "." + ((_b = character === null || character === void 0 ? void 0 : character.thumbnail) === null || _b === void 0 ? void 0 : _b.extension), w: "100%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", rounded: "md" }))),
                React.createElement(react_1.Divider, { mt: 10, mb: 5 }),
                React.createElement(react_1.Box, null,
                    React.createElement(react_1.Text, { fontWeight: "semibold" }, "\u00DAltimos Lan\u00E7amentos")),
                loading ? (React.createElement(react_1.Center, { h: "100px" },
                    React.createElement(react_1.Spinner, { thickness: "4px", speed: "0.65s", emptyColor: "gray.200", color: "red.500", size: "xl" }))) : comics.length > 0 ? (React.createElement(react_1.SimpleGrid, { columns: { base: 2, md: 4, lg: 5 }, spacing: 5, mt: 5 }, comics.map(function (comic) {
                    var _a, _b;
                    return (React.createElement(react_1.Box, null,
                        React.createElement(react_1.Image, { src: ((_a = comic === null || comic === void 0 ? void 0 : comic.thumbnail) === null || _a === void 0 ? void 0 : _a.path) + "." + ((_b = comic === null || comic === void 0 ? void 0 : comic.thumbnail) === null || _b === void 0 ? void 0 : _b.extension), w: "250px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", rounded: "md" }),
                        React.createElement(react_1.Text, null, comic.title)));
                }))) : (React.createElement(react_1.Center, { mt: 5, color: "red.500" }, "Nenhum Quadrinho Econtrado :("))))));
};
