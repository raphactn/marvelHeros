"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var privateKey = 'a8165f58f2cdedf84d7537af8ba063dd057e7808';
var publicKey = 'd6caa04a415e01e2641df1a2d5079872';
var time = Number(new Date());
var hash = (0, _md["default"])(time + privateKey + publicKey);

var api = _axios["default"].create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts: time,
    apikey: publicKey,
    hash: hash
  }
});

var _default = api;
exports["default"] = _default;