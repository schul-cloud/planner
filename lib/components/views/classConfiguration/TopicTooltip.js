var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import IconTrash from '../../../assets/IconTrash';
import IconEdit from '../../../assets/IconEdit';
import IconSave from '../../../assets/IconSave';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
injectGlobal(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .tippy-tooltip.custom-theme {\n    background-color: transparent;\n    border: none;\n    color: inherit;\n    > .enter {\n      background-color: transparent;\n    }\n  }\n\n  .tippy-popper[x-placement^=top] [x-arrow] {\n    border-top: 7px solid transparent;\n  }\n"], ["\n  .tippy-tooltip.custom-theme {\n    background-color: transparent;\n    border: none;\n    color: inherit;\n    > .enter {\n      background-color: transparent;\n    }\n  }\n\n  .tippy-popper[x-placement^=top] [x-arrow] {\n    border-top: 7px solid transparent;\n  }\n"])));
var StyledIcon = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 1px;\n  display: inline-block;\n  cursor: pointer;\n  color: rgba(0, 0, 0, 0.54);\n  :hover {\n    color: #f00;\n  }\n"], ["\n  font-size: 1px;\n  display: inline-block;\n  cursor: pointer;\n  color: rgba(0, 0, 0, 0.54);\n  :hover {\n    color: #f00;\n  }\n"])));
var StyledTooltip = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  background: #f8f8f8d4;\n  padding: 5px 6px;\n  border-radius: 20px;\n  box-shadow: #6f6f6f42 2px 2px 7px 1px;\n  ", " {\n    margin-left: 5px;\n    margin-right: 5px;\n  }\n  ", " ~ ", " {\n    margin-right: 5px;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  background: #f8f8f8d4;\n  padding: 5px 6px;\n  border-radius: 20px;\n  box-shadow: #6f6f6f42 2px 2px 7px 1px;\n  ", " {\n    margin-left: 5px;\n    margin-right: 5px;\n  }\n  ", " ~ ", " {\n    margin-right: 5px;\n  }\n"])), StyledIcon, StyledIcon, StyledIcon);
var StyledTooltipContainer = styled.span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  > * {\n    outline: none;\n  }\n"], ["\n  > * {\n    outline: none;\n  }\n"])));
var TopicTooltip = (function (_super) {
    __extends(TopicTooltip, _super);
    function TopicTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tippyRef = null;
        return _this;
    }
    TopicTooltip.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.isDisabled !== this.props.isDisabled) {
            if (this.props.isDisabled) {
                this.tippyRef.hide();
                this.tippyRef.disable();
            }
            else {
                this.tippyRef.enable();
            }
        }
    };
    TopicTooltip.prototype.componentWillUnmount = function () {
        this.tippyRef.destroy();
    };
    TopicTooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, onEditClick = _a.onEditClick, onDeleteClick = _a.onDeleteClick, onSaveConfiguration = _a.onSaveConfiguration, isLocal = _a.isLocal;
        return (React.createElement(StyledTooltipContainer, null,
            React.createElement(Tippy, { onCreate: function (tip) {
                    _this.tippyRef = tip;
                }, size: "small", animateFill: false, delay: [0, 20], duration: [100, 100], interactive: true, theme: "custom", trigger: "click", distance: 5, content: React.createElement(StyledTooltip, null,
                    !isLocal &&
                        onEditClick && (React.createElement(StyledIcon, { onClick: onEditClick },
                        React.createElement(IconEdit, { height: 20, width: 20 }))),
                    !isLocal &&
                        onDeleteClick && (React.createElement(StyledIcon, { onClick: onDeleteClick },
                        React.createElement(IconTrash, { height: 20, width: 20 }))),
                    isLocal &&
                        onSaveConfiguration && (React.createElement(StyledIcon, { onClick: onSaveConfiguration },
                        React.createElement(IconSave, { height: 20, width: 20 })))) }, children)));
    };
    return TopicTooltip;
}(React.Component));
export default TopicTooltip;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=TopicTooltip.js.map