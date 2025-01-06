interface LogoProps {
  onClick?: () => void;
}

function Logo(props: LogoProps) {
  return (
    <img
      onClick={props.onClick}
      src="/MomentumLogo.webp"
      alt="logo"
      className="logo"
      width="70"
      height="70"
      style={{ filter: "invert(1)" }}
    />
  );
}

export default Logo;
