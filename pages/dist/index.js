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
exports.getServerSideProps = void 0;
var react_1 = require("@chakra-ui/react");
var icons_1 = require("@chakra-ui/icons");
var react_2 = require("react");
var marvel_1 = require("./api/marvel");
var Card_1 = require("../Components/Card");
var router_1 = require("next/router");
var Drawer_1 = require("../Components/Drawer");
var head_1 = require("next/head");
function Home(_a) {
    var data = _a.data;
    var _b = react_2.useState(1), page = _b[0], setPage = _b[1];
    var _c = react_2.useState(0), offset = _c[0], setOffset = _c[1];
    var _d = react_2.useState(""), search = _d[0], setSearch = _d[1];
    var _e = react_2.useState(20), limit = _e[0], setLimit = _e[1];
    var _f = react_2.useState([]), character = _f[0], setCharacter = _f[1];
    var _g = react_2.useState("name"), orderBy = _g[0], setOrderBy = _g[1];
    var _h = react_2.useState(false), open = _h[0], setOpen = _h[1];
    react_2.useEffect(function () {
        if (search.length > 0) {
            router_1["default"].push({
                query: {
                    limit: limit,
                    offset: offset,
                    orderBy: orderBy,
                    nameStartsWith: search
                }
            });
        }
        else {
            router_1["default"].push({
                query: {
                    limit: limit,
                    offset: offset,
                    orderBy: orderBy
                }
            });
        }
    }, [limit, offset, search, orderBy]);
    var handleNextPage = function () {
        setPage(page + 1);
        setOffset(page * data.count);
    };
    var handleBackPage = function () {
        setPage(page - 1);
        setOffset(offset - data.count);
    };
    var handleChangeLimit = function (value) {
        setLimit(value);
        setOffset(0);
        setPage(1);
    };
    var handleOpenCharacter = function (character) {
        setCharacter(character);
        setOpen(!open);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("meta", { "http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests" }),
            React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
            React.createElement("title", null, "Marvel - Search Heros")),
        React.createElement(react_1.Center, { p: 3, bg: "blackAlpha.900" },
            React.createElement("span", { className: "icon--svg icon--svg mvl-animated-logo", "aria-hidden": "true" },
                React.createElement("svg", { width: "130", height: "52", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("rect", { fill: "#EC1D24", width: "100%", height: "100%" }),
                    React.createElement("path", { fill: "#FEFEFE", d: "M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z" }),
                    React.createElement("path", { fill: "#EC1D24", d: "M0 0h30v52H0z" }),
                    React.createElement("path", { fill: "#FEFEFE", d: "M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z" })))),
        React.createElement(react_1.Box, { p: { base: 2, md: 5 } },
            React.createElement(Drawer_1.CharacterDrawer, { open: open, setOpen: setOpen, character: character }),
            React.createElement(react_1.Center, { flexDirection: "column" },
                React.createElement(react_1.Text, { fontSize: "2xl", fontWeight: "bold" }, "EXPLORE O UNIVERSO"),
                React.createElement(react_1.Text, { textAlign: "center", mt: 2 }, "Mergulhe no dominio deslumbrante de todos os personagens cl\u00E1ssicos que voc\u00EA ama - e aqueles que voc\u00EA descobrir\u00E1 em breve!"),
                React.createElement(react_1.InputGroup, { maxW: "lg", mt: 5 },
                    React.createElement(react_1.InputLeftElement, { pointerEvents: "none", children: React.createElement(icons_1.Search2Icon, { color: "red.500" }) }),
                    React.createElement(react_1.Input, { onChange: function (e) { return setSearch(e.target.value); }, focusBorderColor: "red.500", variant: "flushed", placeholder: "Procure por Her\u00F3is" }))),
            React.createElement(react_1.Flex, { mt: 10, justifyContent: "space-between" },
                React.createElement(react_1.Box, null,
                    React.createElement(react_1.Text, null,
                        "Encontrados ",
                        data.count,
                        " Her\u00F3is")),
                React.createElement(react_1.Box, null,
                    React.createElement(react_1.Center, { color: "red.500", gap: 2 },
                        React.createElement(react_1.Image, { src: "ic_heroi.svg" }),
                        React.createElement(react_1.Text, null, "Ordenar por nome A/Z"),
                        React.createElement(react_1.IconButton, { colorScheme: "none", onClick: function () {
                                return setOrderBy(orderBy === "name" ? "-name" : "name");
                            }, "aria-label": "", icon: orderBy === "name" ? (React.createElement(react_1.Image, { cursor: "pointer", src: "toggle_on.svg", w: "50px" })) : (React.createElement(react_1.Image, { cursor: "pointer", src: "toggle_off.svg", w: "50px" })) })))),
            React.createElement(react_1.SimpleGrid, { columns: { base: 2, md: 3, lg: 4, xl: 5 }, spacing: 5, mt: 2 },
                React.createElement(Card_1.Card, { characters: data.results, setCharacter: function (e) { return handleOpenCharacter(e); } })),
            React.createElement(react_1.Flex, { mt: 10, gap: 5, float: "right", mb: 5 },
                React.createElement(react_1.Center, { gap: 5 },
                    React.createElement(react_1.Text, { whiteSpace: "nowrap" }, "Linhas por Pagina: "),
                    React.createElement(react_1.Select, { focusBorderColor: "red.500", value: data.limit, variant: "flushed", onChange: function (e) { return handleChangeLimit(e.target.value); } },
                        React.createElement("option", { value: "5" }, "5"),
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"))),
                React.createElement(react_1.Center, null,
                    React.createElement(react_1.Text, null, page + "-" + data.count + " de " + data.total)),
                React.createElement(react_1.Center, { gap: 2 },
                    React.createElement(react_1.IconButton, { disabled: page === 1 ? true : false, onClick: handleBackPage, icon: React.createElement(icons_1.ChevronLeftIcon, { fontSize: "2xl" }), "aria-label": "" }),
                    React.createElement(react_1.IconButton, { onClick: handleNextPage, icon: React.createElement(icons_1.ChevronRightIcon, { fontSize: "2xl" }), "aria-label": "" }))))));
}
exports["default"] = Home;
exports.getServerSideProps = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, offset, orderBy, nameStartsWith, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = context.query.limit;
                offset = context.query.offset;
                orderBy = context.query.orderBy;
                nameStartsWith = context.query.nameStartsWith;
                return [4 /*yield*/, marvel_1["default"].get("/characters", {
                        params: {
                            limit: limit,
                            offset: offset,
                            orderBy: orderBy,
                            nameStartsWith: nameStartsWith
                        }
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, {
                        props: {
                            data: data.data
                        }
                    }];
        }
    });
}); };
