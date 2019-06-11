"use strict";

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _car = _interopRequireDefault(require("../controllers/car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _auth["default"], _car["default"].createAd);
router.get('/:id', _car["default"].getOneAd);
router.get('/', _car["default"].getAds); //router.put('/:id', auth,carCtrl.modifycar);

router["delete"]('/:id', _auth["default"], _car["default"].deleteAd);
router.patch('/:id/status', _auth["default"], _car["default"].updateAd);
router.patch('/:id/price', _auth["default"], _car["default"].updateAd);
module.exports = router;