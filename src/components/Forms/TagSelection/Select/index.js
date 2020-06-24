/*
MIT LICENSE

Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { Component } from "react";
import PropTypes from "prop-types";
import omit from "omit.js";
import classNames from "classnames";
import RcSelect, { Option, OptGroup } from "rc-select";
import { ConfigConsumer } from "./context";
import getIcons from "./getIcons";
import SizeContext from "./SizeContext";

// We still use class here since `forwardRef` not support generic in typescript
class Select extends Component {
  static Option = Option;

  static OptGroup = OptGroup;

  static SECRET_COMBOBOX_MODE_DO_NOT_USE = "SECRET_COMBOBOX_MODE_DO_NOT_USE";

  selectRef = React.createRef();

  focus = () => {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  };

  blur = () => {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };

  getMode = () => {
    const { mode } = this.props;

    if (mode === "combobox") {
      return undefined;
    }

    if (mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return "combobox";
    }

    return mode;
  };

  renderSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth
  }) => {
    const {
      errors,
      prefixCls: customizePrefixCls,
      notFoundContent,
      className,
      size: customizeSize,
      listHeight = 256,
      listItemHeight = 24,
      getPopupContainer,
      dropdownClassName,
      bordered
    } = this.props;

    const prefixCls = getPrefixCls("select", customizePrefixCls);
    const mode = this.getMode();

    const isMultiple = mode === "multiple" || mode === "tags";

    // ===================== Empty =====================
    let mergedNotFound;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === "combobox") {
      mergedNotFound = null;
    } else {
      mergedNotFound = renderEmpty("Select");
    }

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple
    });

    const selectProps = omit(this.props, [
      "prefixCls",
      "suffixIcon",
      "itemIcon",
      "removeIcon",
      "clearIcon",
      "size",
      "bordered"
    ]);

    const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
      [`${prefixCls}-dropdown-${direction}`]: direction === "rtl"
    });
    return (
      <SizeContext.Consumer>
        {size => {
          const mergedSize = customizeSize || size;
          const mergedClassName = classNames(className, {
            [`${prefixCls}-lg`]: mergedSize === "large",
            [`${prefixCls}-sm`]: mergedSize === "small",
            [`${prefixCls}-rtl`]: direction === "rtl",
            [`${prefixCls}-borderless`]: !bordered,
            "has-error": errors
          });

          return (
            <RcSelect
              ref={this.selectRef}
              virtual={virtual}
              dropdownMatchSelectWidth={dropdownMatchSelectWidth}
              {...selectProps}
              listHeight={listHeight}
              listItemHeight={listItemHeight}
              mode={mode}
              prefixCls={prefixCls}
              direction={direction}
              inputIcon={suffixIcon}
              menuItemSelectedIcon={itemIcon}
              removeIcon={removeIcon}
              clearIcon={clearIcon}
              notFoundContent={mergedNotFound}
              className={mergedClassName}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              dropdownClassName={rcSelectRtlDropDownClassName}
            />
          );
        }}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSelect}</ConfigConsumer>;
  }
}

Select.propTypes = {
  choiceTransitionName: PropTypes.string,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  direction: PropTypes.string,
  dropdownClassName: PropTypes.string,
  errors: PropTypes.string,
  getPopupContainer: PropTypes.func,
  listHeight: PropTypes.number,
  listItemHeight: PropTypes.number,
  mode: PropTypes.string,
  notFoundContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  prefixCls: PropTypes.string,
  size: PropTypes.string,
  transitionName: PropTypes.string
};

Select.defaultProps = {
  transitionName: "slide-up",
  choiceTransitionName: "zoom",
  bordered: true
};

export default Select;
