import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

const MyInp = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options,
  disabled,
  size = "large",
  defaultValue,
  value,
  prefix,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="flex-1">
      {type === "text" ? (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "number" ? (
        <InputNumber
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "password" ? (
        <Input.Password
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <Select
          defaultValue={defaultValue}
          value={value}
          size={size}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
        />
      ) : type === "date" ? (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          type="date"
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === 'textarea' ? (
        <Input.TextArea
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
};

export default MyInp;
