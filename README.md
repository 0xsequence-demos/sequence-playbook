# Project Setup & Usage Guide

## Installation

To get started with the project, follow these steps:

1. **Set up environment variables**
   - Copy the `.dev.vars.example` file and rename it to `.dev.vars`.

2. **Install dependencies**
   ```sh
   pnpm install
   ```

3. **Build or start the development server**
   ```sh
   pnpm run build   # For production build
   pnpm run dev     # For development mode
   ```

---

## Books Structure

Books are stored in the `/app/content/` folder under different topics such as `monetize`, `onboard`, `power`, etc.

### Adding a New Book

1 Create a new file inside the category folder with the format:

  ```ts
   [book-name].tsx
   ```

2 Inside the file, define the following structure:

   ```tsx
   export const info = {
     name: "kebab-case-path", // Example: "monetize/cryptonamp"
     title: "Title of the Book",
     shortName: "Short Title",
     image: { src: "/path/to/image" },
     description: "Short description of the book."
   };

   export function component() {
    return <>{/* React/HTML */}</>
   }
  ```

  The following exports are optional

  ```ts
   export const resources = [
     // Optional: Array of resources related to the book
   ];

   export const loader = serverOnly$(async ()=>{
    // Server-side loader functions -- these run when the page loads (GET)
   })

  export const action = serverOnly$(async ()=>{
    // Server-side action function -- these run when a POST (or PUT) is run against the route
   })

   export default { info, resources, component, loader, action };
   ```

3 Inside the `component`, return content and components you want to display in the book.
4 Take a look at existing books for structure reference.

---

## Widget Builder

Widgets are stored in the `src/examples/examples` directory.

### Creating a Widget

- **Executable Widget**: Create a `.tsx` file with the naming convention:

  ```
  [widget-name]-example.tsx
  ```

  This will be a functional component that can be rendered on the page.

- **Code Snippet Only (Non-Executable)**: Create a `.txt` file instead.

  ```
  [widget-name]-example.txt
  ```

  This will only display a copyable code snippet without rendering.

### Building Widgets

Run the following commands to process the widgets:

```sh
pnpm run build-examples   # Build all widget examples
pnpm run watch-examples   # Watch for changes and rebuild
```

---

## Managing Images

Images are stored in the `src/images` directory. You can create subfolders within it.

### Adding New Images

1 Place images inside the `src/images` folder.
2 Run the build command to generate WebP versions and collect metadata:

   ```sh
   pnpm run images
   ```

### Managing SVG Icons

SVG icons are stored in the `icons` folder.

To build and process icons:

```sh
pnpm run build-svg
```

---

## Running the Project

After installing dependencies, run the following:

```sh
pnpm run dev   # Start development server
```
