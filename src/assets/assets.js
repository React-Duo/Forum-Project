import logo from "./logo.png";
import profile from "./profile.png";

export const assets = {
  logo,
  profile,
};

export const changeTheme = (theme) => {
  if (theme) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    document.querySelector(".NavBarHome").classList.remove("light-theme");
    document.querySelector(".NavBarHome").classList.add("dark-theme");
    document.querySelector("#welcomeTitle").classList.remove("light-themeH1");
    document.querySelector("#welcomeTitle").classList.add("dark-themeH1");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    document.querySelector(".NavBarHome").classList.add("light-theme");
    document.querySelector(".NavBarHome").classList.remove("dark-theme");
    document.querySelector("#welcomeTitle").classList.add("light-themeH1");
    document.querySelector("#welcomeTitle").classList.remove("dark-themeH1");
  }
};
