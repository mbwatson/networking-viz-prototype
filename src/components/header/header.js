import classes from "./header.module.css";
import { Menu } from "./menu";

//

export const Header = ({ menuLinks }) => {
  return (
    <header className={classes.appHeader}>
      <Menu options={menuLinks} />
    </header>
  );
};

Header.propTypes = {
  menuLinks: Menu.propTypes.options,
};
