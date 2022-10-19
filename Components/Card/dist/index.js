"use strict";
exports.__esModule = true;
exports.Card = void 0;
var react_1 = require("@chakra-ui/react");
exports.Card = function (_a) {
    var characters = _a.characters, setCharacter = _a.setCharacter;
    return characters === null || characters === void 0 ? void 0 : characters.map(function (character) { return (React.createElement(react_1.Box, { maxW: "300px" },
        React.createElement(react_1.Image, { src: character.thumbnail.path + "." + character.thumbnail.extension, w: "100%", rounded: "md", boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderBottom: "10px solid", borderColor: "#ff0000", onClick: function () { return setCharacter(character); } }),
        React.createElement(react_1.Flex, { mt: 2, justifyContent: "space-between", ml: 1, mr: 1 },
            React.createElement(react_1.Text, null, character.name)))); });
};
