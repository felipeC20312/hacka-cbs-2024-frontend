interface CustomButtonProps {
  width: string;
  label: string;
  border?: string;
  bgColor: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width,
  label,
  border = '',
  bgColor,
}) => {
  return (
    <button
      className={`flex-shrink-0 w-${width} h-${width} bg-[${bgColor}] ${border} ${
        border ? 'border-[#282828]' : ''
      } rounded-full`}>
      {label}
    </button>
  );
};

export default CustomButton;
