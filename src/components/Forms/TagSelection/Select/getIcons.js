/* eslint-disable react/prop-types */
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
import DownOutlined from "@ant-design/icons/DownOutlined";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import SearchOutlined from "@ant-design/icons/SearchOutlined";

export default function getIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  multiple,
}) {
  // Clear Icon
  let mergedClearIcon = clearIcon;
  if (!clearIcon) {
    mergedClearIcon = <CloseCircleFilled />;
  }

  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon;
  } else if (loading) {
    mergedSuffixIcon = <LoadingOutlined spin />;
  } else {
    mergedSuffixIcon = ({ open, showSearch }) => {
      if (open && showSearch) {
        return <SearchOutlined />;
      }
      return <DownOutlined />;
    };
  }

  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = <CheckOutlined />;
  } else {
    mergedItemIcon = null;
  }

  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = <CloseOutlined />;
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  };
}
/* eslint-enable react/prop-types */
