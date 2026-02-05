# 🎨 Canvas - Application 🎨
--> made by: Ursache Ana-Maria

## 📝 Details about the project:
This project is an interactive application for graphic manipulation on a Canvas element. The central idea was to create a digital workspace where the user can generate, drag and drop, and organize various geometric shapes, while monitoring performance and technical data in real time.

The application focuses on fluid interaction with the user and on the visualization of system data (telemetry), being built with an object-oriented architecture for easy scalability of the types of shapes supported.


### Technologies used to make this project: 💻
--> TypeScript

--> HTML & Canvas API for high-performance graphics rendering.

--> SASS (.scss) for a modern, modular and responsive design.

+ Custom Events for communication between the graphics engine and the user interface.

### Functionalities: 💻
--> Shape generation: Add squares, rectangles, circles, and ellipses by clicking or dragging and dropping directly onto the canvas.

--> Drag & Drop System: Menu buttons can be dragged directly onto the work surface to place the shape exactly at the desired coordinates.

--> Manipulation (Interactive Drag): Shapes can be selected and moved with the mouse anywhere on the canvas.

--> Collision Detection: Shapes change color to red when they overlap.

--> Real-time telemetry: Monitoring of the number of shapes by category, refresh rate (Frame Time), window resolution, and screen orientation.

### Main containers: 💻
--> Details Panel: Control area containing action buttons and statistics panel (Shapes counter & System Logs).

--> Canvas Workspace: Main drawing surface with grid background (millimetric) for visual precision.

## Commands for the setup: 💻
--> cloning: git clone https://github.com/ana-maria-ursache/Canvas-Application

--> for using SASS + changing the design: cd styles; sass --watch _main-style.scss main-style.css.

--> view: Open index.html using the "Live Server" extension in VS Code or run: mpm run dev 

## 📸 Images: 📸

### Desktop Layout
<img width="1901" height="927" alt="image" src="https://github.com/user-attachments/assets/5937aa54-dd1f-4a2f-9dd6-516a6ed88cdf" />

### Mobile Layout:
<img width="534" height="835" alt="image" src="https://github.com/user-attachments/assets/78ed4cef-ead9-438c-9abb-97eedf0f91ed" />
