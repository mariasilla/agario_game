/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: canvas, ctx, button, extraMass, foodCirclesArr, canvasWidth, canvasHeight, playerCoords, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ctx\", function() { return ctx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"button\", function() { return button; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extraMass\", function() { return extraMass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"foodCirclesArr\", function() { return foodCirclesArr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasWidth\", function() { return canvasWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasHeight\", function() { return canvasHeight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playerCoords\", function() { return playerCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ball; });\n/* harmony import */ var _modules_food_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/food.js */ \"./src/modules/food.js\");\n/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/player.js */ \"./src/modules/player.js\");\n\n\n\nconst canvas = document.getElementById(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\nlet button = document.getElementById(\"game_start\");\nlet extraMass = 2;\nlet foodCirclesArr = [];\n\nconst canvasWidth = canvas.width;\nconst canvasHeight = canvas.height;\n\nlet playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 12, \"rgba(255,0,0,1)\");\n\nfunction Ball(x, y, r, color, velX, velY) {\n      this.x = x;\n      this.y = y;\n      this.r = r;\n      this.color = color;\n      this.velX = velX;\n      this.velY = velY;\n}\n\nBall.prototype.draw = function () {\n      ctx.beginPath();\n      ctx.fillStyle = this.color;\n      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);\n      ctx.fill();\n}\n\n//ball animation update\nBall.prototype.update = function () {\n      if ((this.x + this.r) >= canvasWidth) {\n            this.velX = -(this.velX);\n      }\n\n      if ((this.x - this.r) <= 0) {\n            this.velX = -(this.velX);\n      }\n\n      if ((this.y + this.r) >= canvasHeight) {\n            this.velY = -(this.velY);\n      }\n\n      if ((this.y - this.r) <= 0) {\n            this.velY = -(this.velY);\n      }\n\n      this.x += this.velX;\n      this.y += this.velY;\n\n}\n\n\n//Food collision detection\nBall.prototype.collisionDetectFood = function () {\n      for (let j = 0; j < foodCirclesArr.length; j++) {\n            if (!(this === foodCirclesArr[j])) {\n                  let dx = this.x - foodCirclesArr[j].x;\n                  let dy = this.y - foodCirclesArr[j].y;\n                  let distance = Math.sqrt(dx * dx + dy * dy);\n\n                  if (distance < this.r + foodCirclesArr[j].r) {\n                        foodCirclesArr[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';\n                  }\n            }\n      }\n}\n\n\n\n// add player event listeners  \ncanvas.addEventListener(\"mousemove\", _modules_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], false);\n\n\n//function to initiate the game\nfunction gameInit() {\n      // new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);\n      playerCoords.draw();\n      Object(_modules_food_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}\n\n\ngameInit();\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/food.js":
/*!*****************************!*\
  !*** ./src/modules/food.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return makeFood; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\n\n\nlet foodItemCoords;\n\nfunction makeFood() {\n\n    while (_index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"].length < 25) {\n\n        foodItemCoords = new _index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n            Math.floor(Math.random() * 600),\n            Math.floor(Math.random() * 600),\n            9,\n            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',\n            random(-7, 7),\n            random(-7, 7)\n        );\n        _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"].push(foodItemCoords);\n    }\n\n    for (let i = 0; i < _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"].length; i++) {\n        _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].draw();\n        // foodCirclesArr[i].update();\n        // foodCirclesArr[i].collisionDetectFood();\n    }\n    // requestAnimationFrame(makeFood);\n}\n\n//randomize function \nfunction random(min, max) {\n    var num = Math.floor(Math.random() * (max - min + 1)) + min;\n    return num;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n//draw multiple random same-size diff color circles  \n// function drawFood() {\n\n//     for (var i = 0; i < foodNum; i++) {\n//         // ranCircleCoordinates();\n//         // ranCircleColors();\n//         // foodCoords.x = Math.floor(Math.random() * 500);\n//         // foodCoords.y = Math.floor(Math.random() * 500);\n\n//         foodCoords.x = random(0 + foodCoords.r,canvasWidth - foodCoords.r);\n//         foodCoords.y = random(0 + foodCoords.r,canvasWidth - foodCoords.r);\n\n\n//         newCircle = new FoodCircle(foodCoords.x, foodCoords.y, foodCoords.r, random(0,255), random(0,255), random(0,255));\n//         // foodCirclesArr.push(newCircle);\n\n//     }\n\n//         // console.log(foodCirclesArr);\n\n// }\n\n// //randomize circles coordinates \n// function ranCircleCoordinates() {\n//     x = Math.floor(Math.random() * 500);\n//     y = Math.floor(Math.random() * 500);\n//     radius = 9;\n// }\n\n//randomize circles color\n// function ranCircleColors() {\n//     red = Math.floor(Math.random() * 255);\n//     green = Math.floor(Math.random() * 255);\n//     blue = Math.floor(Math.random() * 255);\n// }\n\n//create food circle \n// function FoodCircle(x, y, r, red, green, blue) {\n\n//     ctx.beginPath();\n//     ctx.arc(x, y, r, Math.PI * 2, 0, false);\n//     ctx.fillStyle = \"rgba(\" + red + \",\" + green + \",\" + blue + \",1)\";\n//     ctx.fill();\n//     ctx.closePath();\n// }\n\n\n\n\n//# sourceURL=webpack:///./src/modules/food.js?");

/***/ }),

/***/ "./src/modules/handleCollision.js":
/*!****************************************!*\
  !*** ./src/modules/handleCollision.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return handleCollision; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\n\nlet dx;\nlet dy;\nlet distance;\nlet score = 0;\n\n// collision detection function \nfunction handleCollision() {\n\n    // for (var i = 0; i < foodCirclesArr.length; i++) {\n    for (let i = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"].length - 1; i >= 0; i--) {\n\n        dx = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].x - _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].x;\n        dy = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].y - _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].y;\n        distance = Math.sqrt(dx * dx + dy * dy);\n\n        function removeFoodItem() {\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].save();\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalCompositeOperation = 'destination-out';\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].x, _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].y, _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].r + 1, 0, 2 * Math.PI, false);\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].clip();\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].restore();\n        }\n\n        if (distance < (_index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r + 1) + _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].r) {\n\n            if (_index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r + 1 > _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"][i].r) {\n                removeFoodItem()\n                growPlayerMass();\n                //update player's score\n               score+=5;\n                console.log(score);\n\n                document.getElementById('score').innerHTML = \"Score: \" + score;\n                //remove foodItem from array \n                if (i > -1) {\n                    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"foodCirclesArr\"].splice(i, 1);\n                }\n            }\n\n            console.log(\"Collision detected!\");\n            // console.log(\"Food item X\" + foodCirclesArr[i].x, \"Food item Y\" + foodCirclesArr[i].y);\n            console.log(\"foodItem Index:\" + i);\n        }\n\n    }\n}\n\n//function to grow player's mass \nfunction growPlayerMass() {\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r += _index_js__WEBPACK_IMPORTED_MODULE_0__[\"extraMass\"];\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].draw(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r);\n    console.log(\"extraMass:\" + _index_js__WEBPACK_IMPORTED_MODULE_0__[\"extraMass\"], \"current Mass:\" + _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r);\n}\n\n//# sourceURL=webpack:///./src/modules/handleCollision.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return movePlayer; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n/* harmony import */ var _handleCollision_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handleCollision.js */ \"./src/modules/handleCollision.js\");\n\n\n\nfunction movePlayer(e) {\n    const mousePos = setMousePosition(e);\n    deleteCurrentPlayerPos();\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].x = mousePos.x;\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].y = mousePos.y;\n    //   new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].draw();\n    Object(_handleCollision_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n}\n\n\nfunction setMousePosition(e) {\n    const rect = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].getBoundingClientRect();\n    return {\n        x: e.clientX - rect.top,\n        y: e.clientY - rect.left\n    }\n}\n\n//delete current player position\nfunction deleteCurrentPlayerPos() {\n\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].save();\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalCompositeOperation = 'destination-out';\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].x, _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].y, _index_js__WEBPACK_IMPORTED_MODULE_0__[\"playerCoords\"].r + 1, 0, 2 * Math.PI, false);\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].clip();\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n    _index_js__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].restore();\n\n    // ctx.save();\n    // // ctx.arc(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r, 0, 2*Math.PI, false);\n    // ctx.rect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r + playerCoords.r, playerCoords.r + playerCoords.r);\n    // ctx.clip();\n    // // ctx.clearRect(0, 0, canvasWidth, canvasWidth);\n    // ctx.clearRect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r * 2, playerCoords.r * 2);\n    // ctx.restore();\n}\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/modules/player.js?");

/***/ })

/******/ });