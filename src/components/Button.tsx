interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

const Button = ({ className, text, onClick, ...props }: ButtonProps) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
