import { SideBar } from "../components/SideBar";
import "../styles/Help.css";

export function Help() {
  return (
    <div className="Help">
      <SideBar />
      <div className="HelpDetail">
        <img src="./Help-Section.svg" alt="help" />
        <h2>How can we help you?</h2>
        <p>
          We are here to help you, you can search answers, watch our video
          tutorials, or contact us by email.
        </p>

        {/* Barra de búsqueda */}
        <div className="SearchBar">
          <input type="text" placeholder="Search for answers..." />
          <button>Search</button>
        </div>

        {/* Contenedor de cuadros de ayuda */}
        <div className="ContainerHelp">
          <div className="SquareDashboard BrowserTopic">
            <img src="./Started.svg" alt="Getting Started" />
            <h4>Getting Started</h4>
            <p>Get started fast with configuration guide and video tutorial</p>
          </div>
          <div className="SquareDashboard BrowserTopic">
            <img src="./Features.svg" alt="Product Features" />
            <h4>Product Features</h4>
            <p>
              Learn about all the theme options, features, and functionality
            </p>
          </div>
          <div className="SquareDashboard BrowserTopic">
            <img src="./Tutorials.svg" alt="Tutorials" />
            <h4>Tutorials</h4>
            <p>Watch our video tutorials on how to use the app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
