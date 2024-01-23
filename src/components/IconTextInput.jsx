import {TextInput} from 'react-native';

export default function IconTextInput({
  placeholder,
  icon,
  className,
  ...props
}) {
  return (
    <TextInput
      placeholder={placeholder}
      {...props}
      className={`text-black bg-white w-full rounded-xl shadow-md px-[20] border-[1.5px] border-[#7c7c7c] focus:border-[#005DFE] ${className}`}
    />
  );
}
