import classes from "./footer.module.css";

//

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <span>&copy; {new Date().getFullYear()}</span>
    </footer>
  );
};
