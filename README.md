# Shadcn UI Variants

A collection of custom variations for [shadcn/ui](https://ui.shadcn.com/) components with interactive playgrounds. This project extends the base shadcn/ui library by offering ready-to-use, visually appealing, and easily customizable component variants alongside original components built from scratch.

## Features

- **Interactive Playground:**  
  Experiment with component properties in real time. Adjust configuration, preview updates instantly, and generate corresponding code snippets.

- **Multiple Integration Methods:**

  - **Custom CLI Command:** Automatically install and configure components.
  - **Copy & Paste Code Snippets:** Manually integrate code into your project.
  - **Download as File:** Easily add components as standalone files.

- **Extensible Components:**  
  Grow your component library with custom variants and unique design elements while keeping consistency with shadcn/ui guidelines.

- **Clean Documentation:**  
  Detailed instructions and examples are provided (see the docs pages under `app/(content)/docs/page.tsx`) to guide you through integration and customization.

## Goals

- **Design Consistency:**  
  Maintain a cohesive visual language by extending the design principles of shadcn/ui, ensuring that custom variants blend seamlessly into existing designs.

- **Community Collaboration:**  
  Encourage community contributions by allowing developers to submit pull requests with new variants or improvements. Every contribution is welcome to expand and improve the collection.

## Characteristics

- **Built with Next.js:**  
  Utilizes Next.js’ [app directory](https://nextjs.org/docs/app) (as seen in `app/layout.tsx` and `app/(content)/docs/page.tsx`) for improved routing, metadata handling, and streamlined development.

- **Tailwind CSS Integration:**  
  Global styles and component classes are managed via Tailwind CSS for component styling and responsive design adjustments.

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/shadcn-variants.git
cd shadcn-variants
```

2. **Install Dependencies:**

On Windows, run:

```bash
pnpm install
```

3. **Environmental Variables:**

Add a `.env` file in the root folder and set the two variables:

- `NEXT_PUBLIC_URL="http://localhost:4000"`
- `API_KEY=` create a secure key to be able to execute server actions

4. **Run the Development Server:**

```bash
pnpm dev
```

5. **Open in Browser:**
   Visit http://localhost:4000 to view the project.

## Usage

- **Explore the Documentation:**
  The primary documentation page is found at app/(content)/docs/page.tsx. Learn about integration methods, component usage, and customization details here.
- **Interactive Playgrounds:**
  Use the integrated playgrounds to test and inspect different component variants.

## Contributing

We welcome community contributions! Please ensure your submission includes:

- The complete component code with your custom variant.
- A concise description of the variant’s purpose and design rationale.
- Illustrative examples demonstrating its usage.

For more information, please refer to our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the base component library.
- The open source community for continuous support and improvements.
