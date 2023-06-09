<div id="top"></div>
<div align="center">

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- Title -->
<br />
<h3 align="center">WebGL Village Project</h3>

<hr>

<p align="center">
  Test and demonstration of WebGL with JS 3<br>
  Design and construct a simple village with interactive features<br>
  <a href="#usage">View Demo</a>
  ·
  <a href="https://github.com/John-JonSteyn/ComputerGraphicsVillage/issues">Report Bug</a>
  ·
  <a href="https://github.com/John-JonSteyn/ComputerGraphicsVillage/issues">Request Feature</a>
</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
<summary>Table of Contents</summary>
<ol>
  <li><a href="#introduction">Introduction</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#screenshots">Screenshots</a></li>
  <li><a href="#resources">Resources</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>
  <li><a href="#license">License</a></li>
</ol>
</details>

<!-- Introduction -->
## Introduction
This project is a test and demonstration of WebGL with JS 3. It involves designing and constructing a simple village using WebGL. The village consists of various elements such as a water tank, a barn, and trees. The project also includes buttons and sliders for interactive features like rotation and zooming.

<!-- Project Structure -->
## Project Structure
- `index.html`: The main HTML file that displays the WebGL scene.
- `style.css`: CSS file for styling the HTML elements.
- `script.js`: JavaScript file containing the WebGL code and logic.
- `textures/`: Directory containing textures used in the project.
- `screenshots/`: Directory to store screenshots of the running program.

<!-- Features -->
## Features
- Water Tank: A cylinder-shaped water tank is rendered in the scene.
- Barn: A rectangular structure with a prism roof represents a barn.
- Trees: Trees are rendered using cylinders for trunks and cones for the top half of the tree.
- Ground and Water Pond: The ground is defined, and a water pond is drawn on the ground.
- Buttons:
  - Toggle Rotation: Starts and stops the rotation of shapes in the village.
  - Toggle Direction: Changes the direction of rotation.
- Sliders:
  - Speed Control: Increases or decreases the speed of rotation of shapes.
  - Zoom Control: Allows zooming in or out to the center of the village.

<!-- Usage -->
## Usage
To run the WebGL village project and ensure the scene is displayed correctly, please follow these steps:

1. Download the project ZIP folder and extract it to a local directory on your computer.
2. Open the extracted folder in a code editor or integrated development environment (IDE) of your choice.
3. Locate the `index.html` file within the project directory.
4. Start a local web server to serve the project files. You can use tools like "live-server", "http-server", or any other web server of your choice. If you are using Visual Studio Code, you can install the "Live Server" extension and right-click on the `index.html` file to choose "Open with Live Server".
5. Once the local web server is running, open a web browser.
6. In the web browser, enter the URL for the local web server. This is typically `http://localhost:port`, where `port` is the port number specified by the web server. For example, if the server is running on port 3000, the URL would be `http://localhost:3000`.
7. The WebGL village scene will now be displayed in the web browser, and you can interact with the buttons and sliders as described in the features section.

By following these steps and launching the project through a local web server, you can ensure that the WebGL village project is displayed correctly and you can fully experience its interactive features.

Please note that running the project by directly opening the `index.html` file from the file system (without a web server) may result in a blank canvas due to browser security restrictions. Launching it through a web server is essential to avoid this issue.

<!-- Screenshots -->
## Screenshots
![Village Screenshot 1](screenshots/Screenshot01.png)
![Village Screenshot 2](screenshots/Screenshot02.png)
![Village Screenshot 3](screenshots/Screenshot03.png)

<!-- Resources -->
## Resources
The project utilizes the following resources:
- WebGL: A web graphics API for rendering interactive 2D and 3D graphics.
- JS3: JavaScript library for creating WebGL applications.
- Three.js: A JavaScript 3D library that simplifies WebGL programming.

<!-- License -->
## License
This project is licensed under the [MIT License](LICENSE).

<!-- Links -->
[contributors-shield]: https://img.shields.io/github/contributors/John-JonSteyn/ComputerGraphicsVillage.svg?style=for-the-badge
[contributors-url]: https://github.com/John-JonSteyn/ComputerGraphicsVillage/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/John-JonSteyn/ComputerGraphicsVillage.svg?style=for-the-badge
[forks-url]: https://github.com/John-JonSteyn/ComputerGraphicsVillage/network/members
[stars-shield]: https://img.shields.io/github/stars/TJohn-JonSteyn/ComputerGraphicsVillage.svg?style=for-the-badge
[stars-url]: https://github.com/John-JonSteyn/ComputerGraphicsVillage/stargazers
[issues-shield]: https://img.shields.io/github/issues/John-JonSteyn/ComputerGraphicsVillage.svg?style=for-the-badge
[issues-url]: https://github.com/John-JonSteyn/ComputerGraphicsVillage/issues
[license-shield]: https://img.shields.io/github/license/John-JonSteyn/TaskFlow.svg?style=for-the-badge
[license-url]: https://github.com/John-JonSteyn/ComputerGraphicsVillage/blob/master/LICENSE
